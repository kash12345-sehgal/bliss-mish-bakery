import { useState, useRef } from 'react';
import { useBakeryData } from '../context/DataContext';

export default function AdminPortal({ onNavigateHome }) {
  const {
    products,
    featured,
    addProduct,
    updateProduct,
    deleteProduct,
    addFeatured,
    updateFeatured,
    deleteFeatured,
    resetToDefaults,
    exportData,
    importData,
  } = useBakeryData();

  const [activeTab, setActiveTab] = useState('products'); // 'products' | 'featured' | 'backup'
  const [toastMessage, setToastMessage] = useState(null);

  // Form states for Products
  const [productTitle, setProductTitle] = useState('');
  const [productPrice, setProductPrice] = useState('');
  const [productImageType, setProductImageType] = useState('upload'); // 'upload' | 'url' | 'presets'
  const [productImageUrl, setProductImageUrl] = useState('');
  const [productImagePreview, setProductImagePreview] = useState(null);
  const [productSearch, setProductSearch] = useState('');

  // Form states for Featured
  const [featuredTitle, setFeaturedTitle] = useState('');
  const [featuredIsTall, setFeaturedIsTall] = useState(false);
  const [featuredImageType, setFeaturedImageType] = useState('upload'); // 'upload' | 'url' | 'presets'
  const [featuredImageUrl, setFeaturedImageUrl] = useState('');
  const [featuredImagePreview, setFeaturedImagePreview] = useState(null);
  const [featuredSearch, setFeaturedSearch] = useState('');

  // Editing state
  const [editingItem, setEditingItem] = useState(null); // { type: 'product'|'featured', item: {...} }

  // File input refs
  const productFileRef = useRef(null);
  const featuredFileRef = useRef(null);
  const importFileRef = useRef(null);

  const presetImages = [
    { label: 'Strawberry Cake', src: '/strawberrycake.png' },
    { label: 'Vanilla Choco', src: '/vanillacoco.png' },
    { label: 'Lotus Biscoff', src: '/biscuitcake.jpeg' },
    { label: 'Dark Truffle', src: '/chocolatecake.jpeg' },
    { label: 'Mango Cake', src: '/mango.png' },
    { label: 'Chocolate Cake', src: '/cakechoco.png' },
    { label: 'Brownie', src: '/brownie.png' },
    { label: 'Birthday White', src: '/white.png' },
    { label: 'Artisan Bread', src: '/bread.png' },
    { label: 'White Loaf', src: '/WhiteBread.png' },
    { label: 'Fresh Bun', src: '/bun.png' },
    { label: 'Red Velvet', src: '/red.png' },
    { label: 'Cookies', src: '/cookies.png' },
    { label: 'Donuts', src: '/circle.png' },
  ];

  const showToast = (msg, type = 'success') => {
    setToastMessage({ text: msg, type });
    setTimeout(() => {
      setToastMessage(null);
    }, 3500);
  };

  // Convert uploaded image to Base64 data URL
  const handleFileUpload = (e, setPreview, setUrl) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      showToast('Please upload a valid image file (PNG, JPEG, WebP, SVG)', 'error');
      return;
    }

    if (file.size > 8 * 1024 * 1024) {
      showToast('Image size exceeds 8MB. Please choose a smaller file.', 'error');
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const dataUrl = event.target.result;
      setPreview(dataUrl);
      setUrl(dataUrl);
    };
    reader.readAsDataURL(file);
  };

  // Add Product Handler
  const handleAddProduct = (e) => {
    e.preventDefault();
    if (!productTitle.trim()) {
      showToast('Please enter a product title / name', 'error');
      return;
    }

    const finalImage =
      productImageType === 'upload'
        ? productImagePreview || '/hero-premium.png'
        : productImageUrl.trim() || '/hero-premium.png';

    const newProd = addProduct({
      title: productTitle.trim(),
      price: productPrice.trim() || 'Freshly Baked',
      image: finalImage,
    });

    showToast(`Added "${newProd.title}" to Products! 🍰`);

    // Reset fields
    setProductTitle('');
    setProductPrice('');
    setProductImageUrl('');
    setProductImagePreview(null);
    if (productFileRef.current) productFileRef.current.value = '';
  };

  // Add Featured Handler
  const handleAddFeatured = (e) => {
    e.preventDefault();
    if (!featuredTitle.trim()) {
      showToast('Please enter a title / caption for the featured item', 'error');
      return;
    }

    const finalImage =
      featuredImageType === 'upload'
        ? featuredImagePreview || '/circle.png'
        : featuredImageUrl.trim() || '/circle.png';

    const newFeat = addFeatured({
      alt: featuredTitle.trim(),
      src: finalImage,
      isTall: featuredIsTall,
    });

    showToast(`Added "${newFeat.alt}" to Featured Creations! ✨`);

    // Reset fields
    setFeaturedTitle('');
    setFeaturedIsTall(false);
    setFeaturedImageUrl('');
    setFeaturedImagePreview(null);
    if (featuredFileRef.current) featuredFileRef.current.value = '';
  };

  // Handle Save Edit
  const handleSaveEdit = () => {
    if (!editingItem) return;

    if (editingItem.type === 'product') {
      updateProduct(editingItem.item.id, {
        title: editingItem.item.title,
        price: editingItem.item.price,
        image: editingItem.item.image,
      });
      showToast(`Updated product "${editingItem.item.title}"`);
    } else if (editingItem.type === 'featured') {
      updateFeatured(editingItem.item.id, {
        alt: editingItem.item.alt,
        src: editingItem.item.src,
        isTall: editingItem.item.isTall,
      });
      showToast(`Updated featured creation "${editingItem.item.alt}"`);
    }
    setEditingItem(null);
  };

  // Import file handler
  const handleImportFile = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const result = importData(event.target.result);
      if (result.success) {
        showToast('Successfully restored catalog backup! 🎉');
      } else {
        showToast(`Import failed: ${result.error}`, 'error');
      }
    };
    reader.readAsText(file);
  };

  // Filtered lists
  const filteredProducts = products.filter((p) =>
    p.title.toLowerCase().includes(productSearch.toLowerCase())
  );

  const filteredFeatured = featured.filter((f) =>
    f.alt.toLowerCase().includes(featuredSearch.toLowerCase())
  );

  return (
    <div className="admin-portal">
      {/* Toast Alert */}
      {toastMessage && (
        <div className={`admin-toast ${toastMessage.type === 'error' ? 'admin-toast--error' : ''}`}>
          <span>{toastMessage.text}</span>
          <button type="button" onClick={() => setToastMessage(null)} className="admin-toast__close">
            ✕
          </button>
        </div>
      )}

      {/* Admin Header */}
      <header className="admin-header">
        <div className="admin-header__inner">
          <div className="admin-header__brand">
            <img src="/LOGO.jpeg" alt="Bliss Mish" className="admin-header__logo" />
            <div>
              <div className="admin-header__title-row">
                <h1 className="admin-header__title">Bliss Mish Portal</h1>
                <span className="admin-badge">Secret URL: /up-data</span>
              </div>
              <p className="admin-header__subtitle">
                Manage your live bakery catalog, upload new creations & sync instantly
              </p>
            </div>
          </div>

          <div className="admin-header__actions">
            <button
              type="button"
              className="admin-btn admin-btn--outline"
              onClick={onNavigateHome}
            >
              ← Back to Bakery Website
            </button>
          </div>
        </div>

        {/* Tab Bar */}
        <nav className="admin-nav">
          <button
            type="button"
            className={`admin-nav__tab ${activeTab === 'products' ? 'is-active' : ''}`}
            onClick={() => setActiveTab('products')}
          >
            <span className="admin-nav__icon">🎂</span>
            <span>Our Products</span>
            <span className="admin-nav__count">{products.length}</span>
          </button>

          <button
            type="button"
            className={`admin-nav__tab ${activeTab === 'featured' ? 'is-active' : ''}`}
            onClick={() => setActiveTab('featured')}
          >
            <span className="admin-nav__icon">✨</span>
            <span>Featured Creations</span>
            <span className="admin-nav__count">{featured.length}</span>
          </button>

          <button
            type="button"
            className={`admin-nav__tab ${activeTab === 'backup' ? 'is-active' : ''}`}
            onClick={() => setActiveTab('backup')}
          >
            <span className="admin-nav__icon">💾</span>
            <span>Backup & Reset</span>
          </button>
        </nav>
      </header>

      {/* Main Content Area */}
      <main className="admin-main">
        {/* TAB 1: PRODUCTS */}
        {activeTab === 'products' && (
          <div className="admin-grid">
            {/* Form Section */}
            <div className="admin-card admin-form-card">
              <div className="admin-card__header">
                <h2 className="admin-card__title">Add New Product</h2>
                <p className="admin-card__desc">
                  This product will instantly appear in the <strong>"Our Products"</strong> section and order menu.
                </p>
              </div>

              <form onSubmit={handleAddProduct} className="admin-form">
                {/* Product Name */}
                <div className="admin-field">
                  <label htmlFor="prod-name" className="admin-label">
                    Product Name / Cake Title <span className="req">*</span>
                  </label>
                  <input
                    id="prod-name"
                    type="text"
                    className="admin-input"
                    placeholder="e.g. Pistachio Rose Dream Cake"
                    value={productTitle}
                    onChange={(e) => setProductTitle(e.target.value)}
                    required
                  />
                </div>

                {/* Product Price / Tag */}
                <div className="admin-field">
                  <label htmlFor="prod-price" className="admin-label">
                    Subtitle / Note / Price Tag
                  </label>
                  <input
                    id="prod-price"
                    type="text"
                    className="admin-input"
                    placeholder="e.g. Freshly Baked / ₹550 / Eggless"
                    value={productPrice}
                    onChange={(e) => setProductPrice(e.target.value)}
                  />
                </div>

                {/* Image Selection Mode */}
                <div className="admin-field">
                  <label className="admin-label">Product Image</label>
                  <div className="admin-segmented">
                    <button
                      type="button"
                      className={`admin-segmented__btn ${productImageType === 'upload' ? 'is-active' : ''}`}
                      onClick={() => setProductImageType('upload')}
                    >
                      📁 Upload File
                    </button>
                    <button
                      type="button"
                      className={`admin-segmented__btn ${productImageType === 'url' ? 'is-active' : ''}`}
                      onClick={() => setProductImageType('url')}
                    >
                      🔗 Image URL
                    </button>
                    <button
                      type="button"
                      className={`admin-segmented__btn ${productImageType === 'presets' ? 'is-active' : ''}`}
                      onClick={() => setProductImageType('presets')}
                    >
                      🎨 Pick Preset
                    </button>
                  </div>

                  {/* Mode 1: Upload File */}
                  {productImageType === 'upload' && (
                    <div
                      className="admin-dropzone"
                      onClick={() => productFileRef.current?.click()}
                    >
                      <input
                        ref={productFileRef}
                        type="file"
                        accept="image/*"
                        style={{ display: 'none' }}
                        onChange={(e) =>
                          handleFileUpload(e, setProductImagePreview, setProductImageUrl)
                        }
                      />
                      {productImagePreview ? (
                        <div className="admin-dropzone__preview">
                          <img src={productImagePreview} alt="Preview" />
                          <span className="admin-dropzone__change">Click to change image</span>
                        </div>
                      ) : (
                        <div className="admin-dropzone__empty">
                          <span className="admin-dropzone__icon">📸</span>
                          <span className="admin-dropzone__text">
                            Click to upload photo from your device
                          </span>
                          <span className="admin-dropzone__hint">Supports JPG, PNG, WebP up to 8MB</span>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Mode 2: URL */}
                  {productImageType === 'url' && (
                    <div className="admin-url-box">
                      <input
                        type="text"
                        className="admin-input"
                        placeholder="https://example.com/cake.jpg or /strawberrycake.png"
                        value={productImageUrl}
                        onChange={(e) => {
                          setProductImageUrl(e.target.value);
                          setProductImagePreview(e.target.value);
                        }}
                      />
                      {productImageUrl && (
                        <div className="admin-url-preview">
                          <img
                            src={productImageUrl}
                            alt="URL preview"
                            onError={(e) => (e.currentTarget.style.display = 'none')}
                          />
                        </div>
                      )}
                    </div>
                  )}

                  {/* Mode 3: Presets */}
                  {productImageType === 'presets' && (
                    <div className="admin-presets-grid">
                      {presetImages.map((preset, idx) => (
                        <button
                          key={idx}
                          type="button"
                          className={`admin-preset-chip ${
                            productImageUrl === preset.src ? 'is-selected' : ''
                          }`}
                          onClick={() => {
                            setProductImageUrl(preset.src);
                            setProductImagePreview(preset.src);
                          }}
                        >
                          <img src={preset.src} alt={preset.label} />
                          <span>{preset.label}</span>
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                {/* Live Preview Box */}
                <div className="admin-live-preview">
                  <span className="admin-live-preview__tag">Live Card Preview</span>
                  <article className="cake-card" style={{ maxWidth: '240px', margin: '0 auto' }}>
                    <div className="cake-card__image">
                      <img
                        src={productImagePreview || productImageUrl || '/hero-premium.png'}
                        alt={productTitle || 'Product Preview'}
                        onError={(e) => (e.currentTarget.src = '/hero-premium.png')}
                      />
                    </div>
                    <div className="cake-card__body">
                      <h3>{productTitle || 'Product Name'}</h3>
                      <span className="cake-card__price">{productPrice || 'Freshly Baked'}</span>
                    </div>
                  </article>
                </div>

                <button type="submit" className="admin-btn admin-btn--primary admin-btn--block">
                  ✨ Add Product to Website
                </button>
              </form>
            </div>

            {/* List & Manage Section */}
            <div className="admin-card admin-list-card">
              <div className="admin-card__header admin-card__header--split">
                <div>
                  <h2 className="admin-card__title">Existing Products ({products.length})</h2>
                  <p className="admin-card__desc">View, edit, or delete items currently on your website.</p>
                </div>
                <input
                  type="text"
                  className="admin-input admin-input--search"
                  placeholder="🔍 Search products..."
                  value={productSearch}
                  onChange={(e) => setProductSearch(e.target.value)}
                />
              </div>

              <div className="admin-items-list">
                {filteredProducts.length === 0 ? (
                  <div className="admin-empty">
                    <p>No products found matching "{productSearch}".</p>
                  </div>
                ) : (
                  filteredProducts.map((item, index) => (
                    <div key={item.id || index} className="admin-item-row">
                      <div className="admin-item-row__media">
                        <img
                          src={item.image}
                          alt={item.title}
                          onError={(e) => (e.currentTarget.src = '/hero-premium.png')}
                        />
                      </div>
                      <div className="admin-item-row__info">
                        <h4 className="admin-item-row__title">{item.title}</h4>
                        <span className="admin-item-row__sub">{item.price || 'No price set'}</span>
                      </div>
                      <div className="admin-item-row__actions">
                        <button
                          type="button"
                          className="admin-btn-icon admin-btn-icon--edit"
                          title="Edit Product"
                          onClick={() => setEditingItem({ type: 'product', item: { ...item } })}
                        >
                          ✏️
                        </button>
                        <button
                          type="button"
                          className="admin-btn-icon admin-btn-icon--delete"
                          title="Delete Product"
                          onClick={() => {
                            if (window.confirm(`Delete product "${item.title}" from website?`)) {
                              deleteProduct(item.id);
                              showToast(`Deleted "${item.title}"`);
                            }
                          }}
                        >
                          🗑️
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: FEATURED CREATIONS */}
        {activeTab === 'featured' && (
          <div className="admin-grid">
            {/* Form Section */}
            <div className="admin-card admin-form-card">
              <div className="admin-card__header">
                <h2 className="admin-card__title">Add Featured Creation</h2>
                <p className="admin-card__desc">
                  This showcase item will appear in the <strong>"Featured Creations"</strong> gallery mosaic.
                </p>
              </div>

              <form onSubmit={handleAddFeatured} className="admin-form">
                {/* Title / Caption */}
                <div className="admin-field">
                  <label htmlFor="feat-name" className="admin-label">
                    Caption / Title <span className="req">*</span>
                  </label>
                  <input
                    id="feat-name"
                    type="text"
                    className="admin-input"
                    placeholder="e.g. Belgian Chocolate Donut Tower"
                    value={featuredTitle}
                    onChange={(e) => setFeaturedTitle(e.target.value)}
                    required
                  />
                </div>

                {/* Card Size Toggle */}
                <div className="admin-field">
                  <label className="admin-label">Gallery Grid Format</label>
                  <div className="admin-segmented">
                    <button
                      type="button"
                      className={`admin-segmented__btn ${!featuredIsTall ? 'is-active' : ''}`}
                      onClick={() => setFeaturedIsTall(false)}
                    >
                      ⏹️ Standard Card
                    </button>
                    <button
                      type="button"
                      className={`admin-segmented__btn ${featuredIsTall ? 'is-active' : ''}`}
                      onClick={() => setFeaturedIsTall(true)}
                    >
                      🪜 Tall Card (Double Height)
                    </button>
                  </div>
                </div>

                {/* Image Selection Mode */}
                <div className="admin-field">
                  <label className="admin-label">Showcase Image</label>
                  <div className="admin-segmented">
                    <button
                      type="button"
                      className={`admin-segmented__btn ${featuredImageType === 'upload' ? 'is-active' : ''}`}
                      onClick={() => setFeaturedImageType('upload')}
                    >
                      📁 Upload File
                    </button>
                    <button
                      type="button"
                      className={`admin-segmented__btn ${featuredImageType === 'url' ? 'is-active' : ''}`}
                      onClick={() => setFeaturedImageType('url')}
                    >
                      🔗 Image URL
                    </button>
                    <button
                      type="button"
                      className={`admin-segmented__btn ${featuredImageType === 'presets' ? 'is-active' : ''}`}
                      onClick={() => setFeaturedImageType('presets')}
                    >
                      🎨 Pick Preset
                    </button>
                  </div>

                  {/* Mode 1: Upload */}
                  {featuredImageType === 'upload' && (
                    <div
                      className="admin-dropzone"
                      onClick={() => featuredFileRef.current?.click()}
                    >
                      <input
                        ref={featuredFileRef}
                        type="file"
                        accept="image/*"
                        style={{ display: 'none' }}
                        onChange={(e) =>
                          handleFileUpload(e, setFeaturedImagePreview, setFeaturedImageUrl)
                        }
                      />
                      {featuredImagePreview ? (
                        <div className="admin-dropzone__preview">
                          <img src={featuredImagePreview} alt="Preview" />
                          <span className="admin-dropzone__change">Click to change image</span>
                        </div>
                      ) : (
                        <div className="admin-dropzone__empty">
                          <span className="admin-dropzone__icon">🖼️</span>
                          <span className="admin-dropzone__text">
                            Click to upload photo from your device
                          </span>
                          <span className="admin-dropzone__hint">JPG, PNG, WebP up to 8MB</span>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Mode 2: URL */}
                  {featuredImageType === 'url' && (
                    <div className="admin-url-box">
                      <input
                        type="text"
                        className="admin-input"
                        placeholder="https://example.com/item.jpg or /circle.png"
                        value={featuredImageUrl}
                        onChange={(e) => {
                          setFeaturedImageUrl(e.target.value);
                          setFeaturedImagePreview(e.target.value);
                        }}
                      />
                      {featuredImageUrl && (
                        <div className="admin-url-preview">
                          <img
                            src={featuredImageUrl}
                            alt="URL preview"
                            onError={(e) => (e.currentTarget.style.display = 'none')}
                          />
                        </div>
                      )}
                    </div>
                  )}

                  {/* Mode 3: Presets */}
                  {featuredImageType === 'presets' && (
                    <div className="admin-presets-grid">
                      {presetImages.map((preset, idx) => (
                        <button
                          key={idx}
                          type="button"
                          className={`admin-preset-chip ${
                            featuredImageUrl === preset.src ? 'is-selected' : ''
                          }`}
                          onClick={() => {
                            setFeaturedImageUrl(preset.src);
                            setFeaturedImagePreview(preset.src);
                          }}
                        >
                          <img src={preset.src} alt={preset.label} />
                          <span>{preset.label}</span>
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                <button type="submit" className="admin-btn admin-btn--primary admin-btn--block">
                  ✨ Add to Featured Gallery
                </button>
              </form>
            </div>

            {/* List & Manage Section */}
            <div className="admin-card admin-list-card">
              <div className="admin-card__header admin-card__header--split">
                <div>
                  <h2 className="admin-card__title">Featured Items ({featured.length})</h2>
                  <p className="admin-card__desc">Gallery creations shown in the main showcase grid.</p>
                </div>
                <input
                  type="text"
                  className="admin-input admin-input--search"
                  placeholder="🔍 Search gallery..."
                  value={featuredSearch}
                  onChange={(e) => setFeaturedSearch(e.target.value)}
                />
              </div>

              <div className="admin-featured-preview-grid">
                {filteredFeatured.length === 0 ? (
                  <div className="admin-empty">
                    <p>No featured items found.</p>
                  </div>
                ) : (
                  filteredFeatured.map((item, index) => (
                    <div
                      key={item.id || index}
                      className={`admin-gallery-card ${
                        item.isTall ? 'admin-gallery-card--tall' : ''
                      }`}
                    >
                      <img
                        src={item.src}
                        alt={item.alt}
                        onError={(e) => (e.currentTarget.src = '/hero-premium.png')}
                      />
                      <div className="admin-gallery-card__overlay">
                        <span className="admin-gallery-card__title">{item.alt}</span>
                        {item.isTall && <span className="admin-pill">Tall Card</span>}
                        <div className="admin-gallery-card__btns">
                          <button
                            type="button"
                            className="admin-btn-mini"
                            onClick={() =>
                              setEditingItem({ type: 'featured', item: { ...item } })
                            }
                          >
                            ✏️ Edit
                          </button>
                          <button
                            type="button"
                            className="admin-btn-mini admin-btn-mini--danger"
                            onClick={() => {
                              if (window.confirm(`Remove "${item.alt}" from featured gallery?`)) {
                                deleteFeatured(item.id);
                                showToast(`Removed "${item.alt}"`);
                              }
                            }}
                          >
                            🗑️ Delete
                          </button>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: BACKUP & TOOLS */}
        {activeTab === 'backup' && (
          <div className="admin-backup-container">
            <div className="admin-card">
              <div className="admin-card__header">
                <h2 className="admin-card__title">💾 Backup & Restore Catalog</h2>
                <p className="admin-card__desc">
                  Download a backup file of your products and gallery, or transfer data to another device.
                </p>
              </div>

              <div className="admin-tools-grid">
                <div className="admin-tool-box">
                  <span className="admin-tool-box__icon">📥</span>
                  <h3>Export Data</h3>
                  <p>Download all your current products and featured creations as a JSON file.</p>
                  <button
                    type="button"
                    className="admin-btn admin-btn--primary"
                    onClick={exportData}
                  >
                    Download JSON Backup
                  </button>
                </div>

                <div className="admin-tool-box">
                  <span className="admin-tool-box__icon">📤</span>
                  <h3>Import Backup</h3>
                  <p>Upload a previously exported JSON backup file to restore all items.</p>
                  <input
                    ref={importFileRef}
                    type="file"
                    accept=".json"
                    style={{ display: 'none' }}
                    onChange={handleImportFile}
                  />
                  <button
                    type="button"
                    className="admin-btn admin-btn--outline"
                    onClick={() => importFileRef.current?.click()}
                  >
                    Select JSON File to Restore
                  </button>
                </div>

                <div className="admin-tool-box admin-tool-box--danger">
                  <span className="admin-tool-box__icon">⚠️</span>
                  <h3>Reset to Defaults</h3>
                  <p>Reset the website products and gallery to the original factory default items.</p>
                  <button
                    type="button"
                    className="admin-btn admin-btn--danger"
                    onClick={() => {
                      if (
                        window.confirm(
                          'Are you sure you want to reset all products and featured creations to initial defaults? Custom items will be replaced.'
                        )
                      ) {
                        resetToDefaults();
                        showToast('Reset to original bakery catalog defaults! 🔄');
                      }
                    }}
                  >
                    Reset Everything to Defaults
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Edit Modal */}
      {editingItem && (
        <div className="admin-modal-backdrop" onClick={() => setEditingItem(null)}>
          <div className="admin-modal" onClick={(e) => e.stopPropagation()}>
            <div className="admin-modal__header">
              <h3>
                Edit {editingItem.type === 'product' ? 'Product' : 'Featured Creation'}
              </h3>
              <button
                type="button"
                className="admin-modal__close"
                onClick={() => setEditingItem(null)}
              >
                ✕
              </button>
            </div>

            <div className="admin-modal__body">
              {editingItem.type === 'product' ? (
                <>
                  <div className="admin-field">
                    <label className="admin-label">Product Name</label>
                    <input
                      type="text"
                      className="admin-input"
                      value={editingItem.item.title}
                      onChange={(e) =>
                        setEditingItem({
                          ...editingItem,
                          item: { ...editingItem.item, title: e.target.value },
                        })
                      }
                    />
                  </div>

                  <div className="admin-field">
                    <label className="admin-label">Subtitle / Price Tag</label>
                    <input
                      type="text"
                      className="admin-input"
                      value={editingItem.item.price || ''}
                      onChange={(e) =>
                        setEditingItem({
                          ...editingItem,
                          item: { ...editingItem.item, price: e.target.value },
                        })
                      }
                    />
                  </div>

                  <div className="admin-field">
                    <label className="admin-label">Image URL / Path</label>
                    <input
                      type="text"
                      className="admin-input"
                      value={editingItem.item.image}
                      onChange={(e) =>
                        setEditingItem({
                          ...editingItem,
                          item: { ...editingItem.item, image: e.target.value },
                        })
                      }
                    />
                  </div>
                </>
              ) : (
                <>
                  <div className="admin-field">
                    <label className="admin-label">Title / Caption</label>
                    <input
                      type="text"
                      className="admin-input"
                      value={editingItem.item.alt}
                      onChange={(e) =>
                        setEditingItem({
                          ...editingItem,
                          item: { ...editingItem.item, alt: e.target.value },
                        })
                      }
                    />
                  </div>

                  <div className="admin-field">
                    <label className="admin-label">Card Size Format</label>
                    <div className="admin-segmented">
                      <button
                        type="button"
                        className={`admin-segmented__btn ${!editingItem.item.isTall ? 'is-active' : ''}`}
                        onClick={() =>
                          setEditingItem({
                            ...editingItem,
                            item: { ...editingItem.item, isTall: false },
                          })
                        }
                      >
                        Standard
                      </button>
                      <button
                        type="button"
                        className={`admin-segmented__btn ${editingItem.item.isTall ? 'is-active' : ''}`}
                        onClick={() =>
                          setEditingItem({
                            ...editingItem,
                            item: { ...editingItem.item, isTall: true },
                          })
                        }
                      >
                        Tall (Double Height)
                      </button>
                    </div>
                  </div>

                  <div className="admin-field">
                    <label className="admin-label">Image URL / Path</label>
                    <input
                      type="text"
                      className="admin-input"
                      value={editingItem.item.src}
                      onChange={(e) =>
                        setEditingItem({
                          ...editingItem,
                          item: { ...editingItem.item, src: e.target.value },
                        })
                      }
                    />
                  </div>
                </>
              )}
            </div>

            <div className="admin-modal__footer">
              <button
                type="button"
                className="admin-btn admin-btn--outline"
                onClick={() => setEditingItem(null)}
              >
                Cancel
              </button>
              <button
                type="button"
                className="admin-btn admin-btn--primary"
                onClick={handleSaveEdit}
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

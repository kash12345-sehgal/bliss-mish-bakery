import { useState } from 'react';

export default function About() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <section className="about" id="about">
      <div className="about__inner">
        <div className="about__image reveal" data-reveal="left">
          <div className="about__image-frame">
            <img 
              src="/nani3.png" 
              alt="Nancy, founder of Bliss Mish Bakery" 
              className="about__photo" 
              onError={(e) => e.currentTarget.classList.add('img-fallback')}
            />
            <div className="about__image-placeholder-icon"></div>
          </div>
          <div className="about__image-ring"></div>
          <div className="about__badge">
            <span className="about__badge-num">100%</span>
            <span className="about__badge-label">Homemade</span>
          </div>
        </div>

        <div className="about__text reveal" data-reveal="right">
          <p className="section-eyebrow">The Hands Behind The Batter</p>
          <h2 className="section-title">Meet: Nancy Verma Sehgal</h2>
          <p className="about__quote">
            "Hi, I'm Nancy. Every cake is handcrafted with love, creativity, and premium
            ingredients. Every celebration deserves a beautiful cake."
          </p>
          
          <div className="about__highlights" style={{ display: 'flex', gap: '30px', marginTop: '35px', flexWrap: 'wrap' }}>
            <div style={{ flex: 1, minWidth: '140px' }}>
              <h4 style={{ fontFamily: 'inherit', color: '#b0885a', fontSize: '1.2rem', marginBottom: '5px', fontWeight: 600, display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                100% Eggless
                <img src="/veg.png" alt="Veg Icon" style={{ width: '18px', height: '18px', objectFit: 'contain' }} />
              </h4>
              <p style={{ fontSize: '0.9rem', opacity: 0.8, margin: 0 }}>Baked with pure hygiene & care</p>
            </div>
            <div style={{ flex: 1, minWidth: '140px' }}>
              <h4 style={{ fontFamily: 'inherit', color: '#b38b5d', fontSize: '1.2rem', marginBottom: '5px', fontWeight: 600 }}>Custom Designs</h4>
              <p style={{ fontSize: '0.9rem', opacity: 0.8, margin: 0 }}>Your imagination, our creation</p>
            </div>
            <div style={{ flex: 1, minWidth: '140px' }}>
              <h4 style={{ fontFamily: 'inherit', color: '#b38b5d', fontSize: '1.2rem', marginBottom: '5px', fontWeight: 600 }}>Freshly Baked</h4>
              <p style={{ fontSize: '0.9rem', opacity: 0.8, margin: 0 }}>Made strictly on order basis</p>
            </div>
          </div>

          <div className="about__certificate">
            <div className="about__cert-img-wrapper">
              <img 
                src="/nani2.png" 
                alt="Certified Baker" 
                className="about__cert-img" 
                onClick={() => setIsModalOpen(true)}
              />
            </div>
            
            <div className="about__cert-text">
              <h5 className="about__cert-title">
                Certified Professional Baker 📜
              </h5>
              <p className="about__cert-desc">
                Successfully completed professional baking & pastry arts certification. Combining verified technical expertise with a passion for crafting flawless celebrations.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Full Screen View Pop-up Modal */}
      {isModalOpen && (
        <div 
          id="certModal" 
          style={{ 
            display: 'flex', 
            position: 'fixed', 
            zIndex: 9999, 
            left: 0, 
            top: 0, 
            width: '100%', 
            height: '100%', 
            backgroundColor: 'rgba(0,0,0,0.85)', 
            alignItems: 'center', 
            justifyContent: 'center', 
            backdropFilter: 'blur(5px)',
            cursor: 'pointer'
          }} 
          onClick={() => setIsModalOpen(false)}
        >
          <span style={{ position: 'absolute', top: '20px', right: '35px', color: '#e2b8b8', fontSize: '40px', fontWeight: 'bold' }}>&times;</span>
          <img 
            id="modalImg" 
            src="/nani2.png" 
            alt="Certificate View"
            style={{ 
              maxWidth: '90%', 
              maxHeight: '85%', 
              objectFit: 'contain', 
              borderRadius: '8px', 
              boxShadow: '0 4px 20px rgba(0,0,0,0.5)'
            }} 
          />
        </div>
      )}
    </section>
  );
}

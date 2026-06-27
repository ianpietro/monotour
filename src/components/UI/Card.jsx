import React, { useState } from 'react';
import { Leaf, Bird, Compass, Heart } from 'lucide-react';

export default function Card({ item }) {
  const [isFlipped, setIsFlipped] = useState(false);

  const getIcon = (category) => {
    switch (category) {
      case 'flora':
        return <Leaf className="card-icon-icon text-emerald-600" size={20} />;
      case 'fauna':
        return <Bird className="card-icon-icon text-amber-600" size={20} />;
      default:
        return <Compass className="card-icon-icon" size={20} />;
    }
  };

  return (
    <div 
      className={`item-card ${isFlipped ? 'flipped' : ''}`}
      onClick={() => setIsFlipped(!isFlipped)}
      style={{
        perspective: '1000px',
        width: '100%',
        height: '350px',
        cursor: 'pointer'
      }}
    >
      <div 
        className="card-inner"
        style={{
          position: 'relative',
          width: '100%',
          height: '100%',
          transition: 'transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
          transformStyle: 'preserve-3d',
          transform: isFlipped ? 'rotateY(180deg)' : 'none'
        }}
      >
        {/* Front Side */}
        <div 
          className="card-front glass-card"
          style={{
            position: 'absolute',
            width: '100%',
            height: '100%',
            backfaceVisibility: 'hidden',
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden',
            padding: '0'
          }}
        >
          <div style={{ height: '55%', width: '100%', position: 'relative', overflow: 'hidden' }}>
            <img 
              src={item.img} 
              alt={item.name} 
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                transition: 'transform 0.5s ease'
              }}
              className="card-image"
            />
            <div 
              style={{
                position: 'absolute',
                top: '12px',
                right: '12px',
                background: 'var(--card-bg)',
                padding: '6px',
                borderRadius: '50%',
                display: 'grid',
                placeContent: 'center',
                boxShadow: 'var(--shadow-sm)'
              }}
            >
              {getIcon(item.category)}
            </div>
          </div>
          
          <div style={{ padding: '16px', flex: '1', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', textAlign: 'left' }}>
            <div>
              <span 
                className="badge badge-accent" 
                style={{ marginBottom: '6px', fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}
              >
                {item.category === 'flora' ? 'Flora Amazônica' : 'Fauna / Aves'}
              </span>
              <h3 style={{ margin: '2px 0 4px', fontSize: '1.2rem' }}>{item.name}</h3>
              <p style={{ fontStyle: 'italic', fontSize: '0.85rem', color: 'var(--text-muted)' }}>{item.scientific}</p>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.85rem', color: 'var(--accent-light)' }}>
              <span>Ver curiosidade</span>
              <Compass size={16} />
            </div>
          </div>
        </div>

        {/* Back Side */}
        <div 
          className="card-back glass-card"
          style={{
            position: 'absolute',
            width: '100%',
            height: '100%',
            backfaceVisibility: 'hidden',
            transform: 'rotateY(180deg)',
            display: 'flex',
            flexDirection: 'column',
            padding: '24px',
            textAlign: 'left',
            justifyContent: 'space-between',
            background: 'var(--card-bg)',
            border: '2px solid var(--accent-acai)'
          }}
        >
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
              {getIcon(item.category)}
              <h3 style={{ fontSize: '1.25rem', color: '#0B4F36' }}>{item.title}</h3>
            </div>
            <h4 style={{ color: '#FFB800', fontSize: '0.95rem', fontWeight: '500', marginBottom: '12px' }}>
              {item.subtitle}
            </h4>
            <p style={{ fontSize: '0.9rem', lineHeight: '1.5', color: 'var(--text)' }}>
              {item.description}
            </p>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
            <span>Clique para voltar</span>
            <Compass size={16} style={{ transform: 'rotate(180deg)', color: '#7A1C4A' }} />
          </div>
        </div>
      </div>
    </div>
  );
}

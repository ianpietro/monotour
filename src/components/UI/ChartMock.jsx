import React from 'react';

// A lightweight, highly styleable custom SVG chart component for dashboard fomento and analytics
export function DonutChart({ data, title, totalLabel }) {
  const total = data.reduce((sum, item) => sum + item.value, 0);
  
  let accumulatedAngle = 0;
  
  const slices = data.map((item, idx) => {
    const percentage = total > 0 ? (item.value / total) * 100 : 0;
    const angle = total > 0 ? (item.value / total) * 360 : 0;
    const startAngle = accumulatedAngle;
    accumulatedAngle += angle;
    
    // Convert polar coordinates to Cartesian coordinates for SVG path
    const getCoordinatesForPercent = (percent) => {
      if (isNaN(percent)) return [0, 0];
      const x = Math.cos(2 * Math.PI * percent);
      const y = Math.sin(2 * Math.PI * percent);
      return [x, y];
    };

    const startPercent = startAngle / 360;
    const endPercent = accumulatedAngle / 360;

    const [startX, startY] = getCoordinatesForPercent(startPercent);
    const [endX, endY] = getCoordinatesForPercent(endPercent);

    const largeArcFlag = total > 0 && percentAngle(item.value, total) > 180 ? 1 : 0;

    // Path command for drawing pie slice
    const pathData = total > 0 ? [
      `M ${startX * 80 + 100} ${startY * 80 + 100}`, // Move to starting arc point
      `A 80 80 0 ${largeArcFlag} 1 ${endX * 80 + 100} ${endY * 80 + 100}`, // Arc to ending point
      `L 100 100`, // Line back to center
      'Z' // Close path
    ].join(' ') : '';

    return {
      ...item,
      pathData,
      percentage,
      color: item.color || `hsl(142, 60%, ${30 + idx * 10}%)`
    };
  });

  function percentAngle(val, tot) {
    if (tot === 0) return 0;
    return (val / tot) * 360;
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '16px' }}>
      <h3 style={{ fontSize: '1.1rem', fontWeight: '600', marginBottom: '20px', textAlign: 'center', color: 'var(--text-h)' }}>{title}</h3>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '24px', alignItems: 'center', justifyContent: 'center', width: '100%' }}>
        {/* SVG Donut */}
        <div style={{ position: 'relative', width: '200px', height: '200px' }}>
          <svg viewBox="0 0 200 200" style={{ transform: 'rotate(-90deg)', width: '100%', height: '100%' }}>
            {slices.map((slice, idx) => (
              <path
                key={idx}
                d={slice.pathData}
                fill={slice.color}
                style={{
                  transition: 'filter 0.2s',
                  cursor: 'pointer'
                }}
                onMouseEnter={(e) => e.target.setAttribute('filter', 'brightness(1.15)')}
                onMouseLeave={(e) => e.target.removeAttribute('filter')}
              />
            ))}
            {/* Donut Hole */}
            <circle cx="100" cy="100" r="50" fill="var(--bg)" />
          </svg>
          
          {/* Inner label */}
          <div 
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              textAlign: 'center',
              pointerEvents: 'none',
              width: '90px'
            }}
          >
            <span style={{ fontSize: '0.75rem', textTransform: 'uppercase', color: 'var(--text-muted)', display: 'block', fontWeight: '500' }}>
              {totalLabel || 'Total'}
            </span>
            <span style={{ fontSize: '1.15rem', fontWeight: '700', color: 'var(--text-h)', display: 'block', whiteSpace: 'nowrap' }}>
              {total >= 1000 ? `R$ ${total.toLocaleString('pt-BR', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}` : total}
            </span>
          </div>
        </div>

        {/* Legend */}
        <div style={{ flex: '1', minWidth: '180px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {slices.map((slice, idx) => (
            <div key={idx} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '0.85rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ width: '12px', height: '12px', borderRadius: '3px', background: slice.color, display: 'inline-block' }}></span>
                <span style={{ color: 'var(--text)', fontWeight: '550' }}>{slice.label}</span>
              </div>
              <span style={{ color: 'var(--text-h)', fontWeight: '600' }}>
                {slice.value.toLocaleString('pt-BR', { style: slice.isCurrency ? 'currency' : 'decimal', currency: 'BRL', maximumFractionDigits: 0 })}
                <span style={{ color: 'var(--text-muted)', fontWeight: '400', fontSize: '0.75rem', marginLeft: '4px' }}>
                  ({slice.percentage.toFixed(0)}%)
                </span>
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export function BarChart({ data, title }) {
  const maxVal = Math.max(...data.map(d => d.value), 1);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', padding: '16px' }}>
      <h3 style={{ fontSize: '1.1rem', fontWeight: '600', marginBottom: '20px', color: 'var(--text-h)', textAlign: 'left' }}>{title}</h3>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
        {data.map((item, idx) => {
          const pct = (item.value / maxVal) * 100;
          return (
            <div key={idx} style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem' }}>
                <span style={{ color: 'var(--text)', fontWeight: '550' }}>{item.label}</span>
                <span style={{ color: 'var(--text-h)', fontWeight: '600' }}>{item.value} clientes</span>
              </div>
              <div style={{ width: '100%', height: '10px', background: 'rgba(27, 94, 32, 0.05)', borderRadius: 'var(--radius-full)', overflow: 'hidden' }}>
                <div 
                  style={{ 
                    width: `${pct}%`, 
                    height: '100%', 
                    background: item.color || 'linear-gradient(90deg, var(--accent) 0%, var(--accent-light) 100%)',
                    borderRadius: 'var(--radius-full)',
                    transition: 'width 1s cubic-bezier(0.16, 1, 0.3, 1)'
                  }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

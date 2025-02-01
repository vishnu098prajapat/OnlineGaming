import React from 'react';

const TempleRun = () => {
  return (
    <div className="embedded-game">
      <iframe
        src="https://html5.gamedistribution.com/rvvASMiM/f804d079d19f44d3b951ead4588e974a/"
        frameBorder="0"
        scrolling="no"
        allowFullScreen
        style={{
          width: '800px',
          height: '600px',
          border: 'none',
          borderRadius: '8px',
          boxShadow: '0 0 20px rgba(0,0,0,0.3)'
        }}
      ></iframe>
    </div>
  );
};

export default TempleRun;

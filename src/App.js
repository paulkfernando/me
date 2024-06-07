import React, { useEffect, useState } from 'react';
import { TypeAnimation } from 'react-type-animation';
import './App.css';
import axios from 'axios';


function downloadResume() {
  const link = document.createElement('a');
  link.href = `${process.env.PUBLIC_URL}/Resume.pdf`;
  link.setAttribute('download', 'Resume.pdf');
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

function App() {
  const [time, setTime] = useState(new Date());
  const [quote, setQuote] = useState('');
  const [author, setAuthor] = useState('');

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    fetchQuote();
  }, []);

  const fetchQuote = async () => {
    try {
      const response = await axios.get('https://api.quotable.io/random');
      setQuote(response.data.content);
      setAuthor(response.data.author);
    } catch (error) {
      console.error('Error fetching quote:', error);
    }
  };
  return (
    <div className='App'>
      <div className='box' style={{backgroundColor: "#254336", display: 'flex', flexDirection: 'row'}}>
        <div className ='name' style={{height: "100%", width: "60%", display: 'flex', alignItems: 'center', marginLeft: '2.5%'}}>
          <TypeAnimation
            sequence={['Paul Fernando', 10]}
            speed={10}
            wrapper="span"
            repeat={0}
            cursor={null}
          />
        </div>
        <div style={{height: "100%", width: "40%", display: 'flex', alignItems: 'center', justifyContent:'center', fontSize: '6.5vw', color: '#DAD3BE'}}>
          {time.toLocaleTimeString()}
        </div>
      </div>
      <div className='box' style={{backgroundColor: "#6B8A7A", display: 'flex', flexDirection: 'row'}}>
        <div style={{height:"100%", width:"100%", display: 'flex', alignItems: 'center', marginLeft: '2.5%'}}>
            <p style={{fontSize: '2.0vw', color: '#B7B597'}}>Hi! This is my website, below are links to my resume download, Linkedin, and Github.
              I've finished my 3rd year at Queen's University in the Computer Engineering Program. I'm interested
              in hardware and firmware development. In my free time I enjoy boxing, biking, and on occasion video games.
            </p>
        </div>
      </div>
      <div className='box' style={{backgroundColor: "#B7B597", display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-evenly', textAlign: 'center'}}>
        <button onClick={() => window.open('https://github.com/paulkfernando?tab=repositories', '_blank')} style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer', width: 'fit-content', height: 'fit-content'}}>
          <ion-icon name="logo-github" style={{ fontSize: '9vw', color: '#254336' }}></ion-icon>
        </button>
        <button onClick={() => window.open('https://www.linkedin.com/in/paul-fernando-1b603b217/', '_blank')} style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer', width: 'fit-content', height: 'fit-content'}}>
          <ion-icon name="logo-linkedin" style={{ fontSize: '9vw', color: '#254336' }}></ion-icon>
        </button>
        <button onClick={downloadResume} style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer', width: 'fit-content', height: 'fit-content'}}>
          <ion-icon name="arrow-down-circle-outline" style={{ fontSize: '9vw', color: '#254336' }}></ion-icon>
        </button>
      </div>
      <div onClick={fetchQuote} className='box' style={{backgroundColor: "#DAD3BE", display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-evenly', textAlign: 'center'}}>
          <p style={{fontSize: '2.0vw', color: '#254336', textAlign: 'center'}}>
            <span style={{fontWeight: 'bold'}}>“{quote}”</span> - {author}
          </p>
      </div>
    </div>
  );
}

export default App;

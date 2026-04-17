import { useState, useCallback } from 'react';
import confetti from 'canvas-confetti';
import './App.css';
import { Users, TrendingUp, ChevronLeft, RefreshCcw } from 'lucide-react';

const CANDIDATES = [
  {
    id: 'tvk',
    name: 'TVK',
    leader: 'Thalapathy Vijay',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/ff/Vijay_at_Protest_of_the_Nadigar_Sangam.jpg/500px-Vijay_at_Protest_of_the_Nadigar_Sangam.jpg',
    primaryColor: '#f59e0b',
    secondaryColor: '#7f1d1d',
  },
  {
    id: 'dmk',
    name: 'DMK',
    leader: 'M. K. Stalin',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9d/The_Chief_Minister_of_Tamil_Nadu%2C_Thiru_MK_Stalin.jpg/500px-The_Chief_Minister_of_Tamil_Nadu%2C_Thiru_MK_Stalin.jpg',
    primaryColor: '#dc2626',
    secondaryColor: '#000000',
  },
  {
    id: 'aiadmk',
    name: 'AIADMK',
    leader: 'Edappadi K. Palaniswami',
    image: 'https://upload.wikimedia.org/wikipedia/commons/0/03/Palanisamy.jpg',
    primaryColor: '#15803d',
    secondaryColor: '#e11d48',
  },
  {
    id: 'ntk',
    name: 'NTK',
    leader: 'Seeman',
    image: 'https://upload.wikimedia.org/wikipedia/commons/1/11/Tamil_Eelam_Champion_Seeman_Speech_Outside_UN_headquarters_Geneva_002.jpg',
    primaryColor: '#b91c1c',
    secondaryColor: '#fef08a',
  }
];

const INITIAL_VOTES = {
  tvk: 0,
  dmk: 0,
  aiadmk: 0,
  ntk: 0
};

export default function App() {
  const [hasVoted, setHasVoted] = useState(false);
  const [selectedCandidate, setSelectedCandidate] = useState(null);
  const [votes, setVotes] = useState(INITIAL_VOTES);
  const [isCasting, setIsCasting] = useState(false);

  const [formData, setFormData] = useState({
    district: '',
    ward: '',
    ageCategory: ''
  });

  const totalVotes = Object.values(votes).reduce((a, b) => a + b, 0);

  const handleFormChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSelectCandidate = (id) => {
    setSelectedCandidate(id);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (formData.district && formData.ward && formData.ageCategory) {
      handleVote(selectedCandidate);
    }
  };

  const handleVote = useCallback((candidateId) => {
    setIsCasting(true);
    
    setTimeout(() => {
      setVotes(prev => ({
        ...prev,
        [candidateId]: prev[candidateId] + 1
      }));
      setHasVoted(true);
      setIsCasting(false);
      
      const candidateInfo = CANDIDATES.find(c => c.id === candidateId);
      const end = Date.now() + 3 * 1000;
      const colors = [candidateInfo.primaryColor, candidateInfo.secondaryColor, '#ffffff'];

      (function frame() {
        confetti({
          particleCount: 5,
          angle: 60,
          spread: 55,
          origin: { x: 0 },
          colors: colors
        });
        confetti({
          particleCount: 5,
          angle: 120,
          spread: 55,
          origin: { x: 1 },
          colors: colors
        });

        if (Date.now() < end) {
          requestAnimationFrame(frame);
        }
      }());
    }, 800);
  }, []);

  const resetVoter = () => {
    setHasVoted(false);
    setSelectedCandidate(null);
    setFormData({ district: '', ward: '', ageCategory: '' });
  };
  return (
    <div className="app-container">
      <header className="header animate-slide-up">
        {hasVoted ? (
          <>
            <TrendingUp size={48} className="mx-auto mb-4 text-accent" style={{ color: '#3b82f6', display: 'block', margin: '0 auto 1rem auto'}} />
            <h1 className="text-gradient">Live Election Results</h1>
            <p>TN Assembly Elections 2026</p>
          </>
        ) : selectedCandidate ? (
           <>
            <Users size={48} className="mx-auto mb-4 text-accent" style={{ color: '#3b82f6', display: 'block', margin: '0 auto 1rem auto'}} />
            <h1 className="text-gradient">Voter Registration</h1>
            <p>Please provide your details securely to cast the vote.</p>
          </>
        ) : (
           <>
            <Users size={48} className="mx-auto mb-4 text-accent" style={{ color: '#3b82f6', display: 'block', margin: '0 auto 1rem auto'}} />
            <h1 className="text-gradient">Select Your Leader</h1>
            <p>Tamil Nadu Assembly Elections 2026 - Mock Poll</p>
          </>
        )}
      </header>

      <main>
        {!hasVoted && !selectedCandidate ? (
          <div className="candidates-grid">
            {CANDIDATES.map((candidate, index) => (
              <div 
                key={candidate.id} 
                className="candidate-card animate-scale-in"
                style={{ 
                  '--party-primary': candidate.primaryColor, 
                  '--party-secondary': candidate.secondaryColor,
                  '--glow-color': `${candidate.primaryColor}80`,
                  animationDelay: `${index * 0.15}s`
                }}
                onClick={() => handleSelectCandidate(candidate.id)}
              >
                <div className="card-icon">
                  <img src={candidate.image} alt={candidate.leader} />
                </div>
                <h2>{candidate.name}</h2>
                <p>{candidate.leader}</p>
                <button className="vote-btn">
                  Vote Now
                </button>
              </div>
            ))}
          </div>
        ) : null}

        {selectedCandidate && !hasVoted ? (
          <div className="glass-panel voter-form animate-slide-up">
            <h2 style={{ textAlign: 'center', marginBottom: '1rem' }}>Enter Registration Details</h2>
            <form onSubmit={handleFormSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              <div className="form-group">
                <label htmlFor="district">District</label>
                <select 
                  id="district" 
                  name="district" 
                  className="form-control" 
                  value={formData.district} 
                  onChange={handleFormChange} 
                  required
                >
                  <option value="" disabled>Select your district...</option>
                  <option value="Chennai">Chennai</option>
                  <option value="Coimbatore">Coimbatore</option>
                  <option value="Madurai">Madurai</option>
                  <option value="Trichy">Trichy</option>
                  <option value="Salem">Salem</option>
                  <option value="Other">Other...</option>
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="ward">Ward / Constituency</label>
                <input 
                  type="text" 
                  id="ward" 
                  name="ward" 
                  className="form-control" 
                  placeholder="Enter Ward Number or Name" 
                  value={formData.ward} 
                  onChange={handleFormChange} 
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="ageCategory">Age Category</label>
                <select 
                  id="ageCategory" 
                  name="ageCategory" 
                  className="form-control" 
                  value={formData.ageCategory} 
                  onChange={handleFormChange} 
                  required
                >
                  <option value="" disabled>Select age...</option>
                  <option value="18-25">18-25</option>
                  <option value="26-35">26-35</option>
                  <option value="36-50">36-50</option>
                  <option value="51-65">51-65</option>
                  <option value="65+">65+</option>
                </select>
              </div>

              <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
                <button 
                  type="button" 
                  className="btn-primary" 
                  style={{ background: 'rgba(255,255,255,0.1)', flex: 1 }}
                  onClick={() => setSelectedCandidate(null)}
                  disabled={isCasting}
                >
                  Cancel
                </button>
                <button type="submit" className="btn-primary" style={{ flex: 2 }} disabled={isCasting}>
                  {isCasting ? 'Processing...' : 'Confirm Vote'}
                </button>
              </div>
            </form>
          </div>
        ) : null}

        {hasVoted ? (
          <div className="glass-panel results-container animate-scale-in">
            <h2 className="results-title">Current Standings</h2>
            
            <div className="results-list">
              {CANDIDATES.slice().sort((a, b) => votes[b.id] - votes[a.id]).map((candidate, index) => {
                const candidateVotes = votes[candidate.id];
                const percentage = totalVotes === 0 ? 0 : ((candidateVotes / totalVotes) * 100).toFixed(1);
                
                return (
                  <div key={candidate.id} className="result-bar-wrapper" style={{ animationDelay: `${index * 0.2}s` }}>
                    <div className="result-header">
                      <span style={{ fontSize: '1.25rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <img src={candidate.image} alt={candidate.name} style={{ width: '24px', height: '24px', borderRadius: '50%', objectFit: 'cover' }} />
                        {candidate.name}
                      </span>
                      <span style={{ fontSize: '1.25rem', fontFamily: "'Space Grotesk', sans-serif" }}>
                        {candidateVotes.toLocaleString()} ({percentage}%)
                      </span>
                    </div>
                    <div className="progress-track" style={{ height: '30px' }}>
                      <div 
                        className="progress-fill" 
                        style={{ 
                          width: `${percentage}%`,
                          '--party-primary': candidate.primaryColor,
                          '--party-secondary': candidate.secondaryColor
                        }}
                      ></div>
                    </div>
                  </div>
                );
              })}
            </div>
            
            <div style={{ display: 'flex', justifyContent: 'center', gap: '1.5rem', marginTop: '3rem' }}>
              <button 
                className="vote-btn" 
                onClick={resetVoter}
                style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}
              >
                <ChevronLeft size={20} /> Submit Another Vote
              </button>
            </div>
          </div>
        ) : null}
      </main>
    </div>
  );
}

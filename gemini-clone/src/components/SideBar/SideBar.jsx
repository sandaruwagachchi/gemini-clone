import './SideBar.css';
import { assets } from '../../assets/assets.js';
import { useContext, useState } from 'react';
import { Context } from '../../context/Context.jsx';

const SideBar = () => {
  const [extended, setExtended] = useState(false); // Toggle extended sidebar
  const { onSent, prevPrompts, setRecentPrompt, newChat } = useContext(Context); // Get context values

  // Function to load a recent prompt
  const loadPrompt = async (prompt) => {
    console.log("Loading prompt:", prompt); // Debugging log
    setRecentPrompt(prompt); // Set the current prompt as recent
    await onSent(prompt); // Trigger onSent to fetch and display response
  };

  return (
    <div>
      <div className="sidebar">
        {/* Top section */}
        <div className="top">
          <img
            onClick={() => setExtended((prev) => !prev)} // Toggle sidebar extension
            className="menu"
            src={assets.menu_icon}
            alt="Menu Icon"
          />
          <div onClick={()=>{newChat()}} className="new-chat">
            <img src={assets.plus_icon} alt="Plus Icon" />
            {extended ? <p>New Chat</p> : null} {/* Display label if extended */}
          </div>
          {extended ? (
            <div className="recent">
              <p className="recent-title">Recent</p>
              {prevPrompts.map((item, index) => (
                <div
                  key={index} // Add a unique key for each item
                  onClick={() => loadPrompt(item)} // Handle click for the recent prompt
                  className="recent-entry"
                >
                  <img src={assets.message_icon} alt="Message Icon" />
                  <p>{item.slice(0, 18)}...</p> {/* Display trimmed prompt */}
                </div>
              ))}
            </div>
          ) : null}
        </div>

        {/* Bottom section */}
        <div className="bottom">
          <div className="bottom-item recent-entry">
            <img src={assets.question_icon} alt="Question Icon" />
            {extended ? <p>Help</p> : null}
          </div>
          <div className="bottom-item recent-entry">
            <img src={assets.history_icon} alt="History Icon" />
            {extended ? <p>Activity</p> : null}
          </div>
          <div className="bottom-item recent-entry">
            <img src={assets.setting_icon} alt="Settings Icon" />
            {extended ? <p>Setting</p> : null}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SideBar;

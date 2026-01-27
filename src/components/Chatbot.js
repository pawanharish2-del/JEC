// src/components/Chatbot.js
import React, { useEffect } from 'react';

const Chatbot = () => {
    useEffect(() => {
        // Create the script element
        const script = document.createElement("script");
        script.type = "text/javascript";
        script.async = true;
        // This is the URL from your "NIAA Web" snippet
        script.src = "https://chatbot.in4.nopaperforms.com/en-gb/backend/bots/niaachtbtscpt.js/1f19ca5e523045378aa171e5cf56bf41/109143a3734740eca68202060a33207b";

        // Append it to the body
        document.body.appendChild(script);

        // Cleanup: Remove script if component unmounts (optional but good practice)
        return () => {
            if (document.body.contains(script)) {
                document.body.removeChild(script);
            }
        };
    }, []);

    // This div is required by the chatbot script to initialize
    return (
        <div
            className="npf_chatbots"
            data-w="109143a3734740eca68202060a33207b"
            style={{ display: 'none' }}
        ></div>
    );
};

export default Chatbot;
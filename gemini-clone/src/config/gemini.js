import {GoogleGenerativeAI} from "@google/generative-ai";
  
  // Directly assigning the API key (not recommended for production)
  const apiKey = "AIzaSyD_8juUaIfH0GB2G99HMC22NuxHRY5W0b0";
  
  // Initialize the Generative AI client
  const genAI = new GoogleGenerativeAI(apiKey);
  
  // Configure the generative model
  const model = genAI.getGenerativeModel({
    model: "gemini-2.0-flash-exp",
  });
  
  // Define the generation configuration
  const generationConfig = {
    temperature: 1,
    topP: 0.95,
    topK: 40,
    maxOutputTokens: 8192,
    responseMimeType: "text/plain",
  };
  
  async function run(prompt) {
    try {
      // Start a chat session
      const chatSession = model.startChat({
        generationConfig,
        history: [],
      });
  
      // Replace "INSERT_INPUT_HERE" with the actual input you want to process
      const result = await chatSession.sendMessage(prompt);
      
      // Output the response
      console.log(result.response.text());
      return result.response.text();
    } catch (error) {
      console.error("Error during chat session:", error);
    }
  }
  
  // Run the function
  export default run;
  
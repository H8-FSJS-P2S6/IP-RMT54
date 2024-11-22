import { GoogleGenerativeAI } from"@google/generative-ai"


export const gemini = async(pokemon)=>{
  const genAI = new GoogleGenerativeAI("AIzaSyDqXCiuqBixYQxmOuanMEkShpeWsqWLVhg");
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
  
  const prompt = `Give me only 1 fun fact about ${pokemon} pokemon`;
  
  const result = await model.generateContent(prompt);
  return result.response.text()

}
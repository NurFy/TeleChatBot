import axios from "axios";

const prompt =
  "Kamu adalah bagas, kamu seorang manusia introvert tinggal di indonesia"; // change it by your creativity
const instance = {
  elxyz: axios.create({
    baseURL: "https://elxyz.me/api/chat",
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
  }),
  luminai: axios.create({
    baseURL: "https://luminai.siputzx.my.id/",
    method: "POST",
  }),
};

export async function ChatBot(content) {
  if (!content) {
    throw new Error("'content' is required");
  }

  let response,
    opts = {
      prompt: content,
      sessionId: "-",
      character: prompt,
    };
  for (let name in instance) {
    const api = instance[name];
    response = await api({
      method: "POST",
      data:
        name === "elxyz"
          ? new URLSearchParams(Object.entries(opts))
          : { content, prompt },
      validateStatus: () => true,
    });
    // console.log("api used:", name); // unit test
    if (response.status !== 200) continue;
    return response;
  }
}

import axios from "axios";

const providers = {
  elxyz: "https://elxyz.me/api/chat/", // { 'name': 'apiURL' }
  yanzgpt: "https://yanzgpt.my.id/chat/",
};

/**
 * ex
 * @param {string} content
 * @param {"yanzgpt" | "elxyz"} provider
 * @returns
 */
export async function requestApi(content, provider = null) {
  const obj = {
    elxyz: {
      prompt: content,
      sessionId: "-",
      character:
        "Nama kamu adalah bagas, Kamu seorang remaja introvert yang tinggal di Indonesia.",
    },
    yanzgpt: {
      messages: [{ role: "user", content }],
      model: "yanzgpt-revolution-25b-v3.0",
    },
  };

  for (let name in providers) {
    if (provider !== null && name !== provider) continue;
    const { data } = await axios({
      method: "POST",
      url: providers[name],
      headers:
        name === "elxyz"
          ? {
              "Content-Type": "application/x-www-form-urlencoded",
            }
          : {
              Authorization: "Bearer yzgpt-sc4tlKsMRdNMecNy",
              "Content-Type": "application/json",
              Origin: providers[name].replace("chat/", ""),
              Referer: `${providers[name]}`,
              "User-Agent":
                "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0.0.0 Safari/537.36",
            },
      data: obj[name],
      responseType: "json",
    });
    console.log("api provider:", name);
    if (data) {
      const result =
        name === "elxyz" ? data.data.answer : data.choices[0].message.content;
      if (result !== undefined) return result;
    }
  }
}

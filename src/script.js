const chatBody = document.querySelector(".chat-body");
const messageInput = document.querySelector(".message-input");
const sendMessageBtn = document.querySelector(".send-message");
const fileInput = document.querySelector("#file-input");
const fileUploadWrapper = document.querySelector(".file-upload-wrapper");
const fileCancelButton = document.querySelector("#file-cancel");

// import { chandanInfo } from "./chandanInfo";

// API setup
const API_KEY = "AIzaSyARrus7KKPz9xd5gZiln5a9wiThXg3YLKw";
const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${API_KEY}`;

// Shown to the user whenever the API fails (expired/suspended key, quota, network, bad response)
const GENERIC_ERROR_MESSAGE = "The assistant is unavailable right now. Please try again later.";

const userData = {
    message: null,
    file: {
        data: null,
        mime_type: null
    }
}

// const chatHistory = [{
//     hideInChat: true,
//     role: "model",
//     text: chandanInfo
// }];

const chatHistory = [];

// create message element with dynamic classes and return it
const createMessageElement = (content, ...classes) => {
    const div = document.createElement("div");
    div.classList.add("message", ...classes);

    div.innerHTML = content;
    return div;
}

// Generate bot response using API
const generateBotResponse = async(incomingMessageDiv) => {
    const messageElement = incomingMessageDiv.querySelector(".message-text");

    // Add user message to chat history
    chatHistory.push({
        role: "user",
        parts: [{ text: userData.message }, ...(userData.file.data ? [{ inline_data: userData.file }] : [])]
    });

    // API request options
    const requestOptions = {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify({
            contents: chatHistory
        })
    }

    try {
        // Fetching bot response from API
        const response = await fetch(API_URL, requestOptions);
        const data = await response.json();
        if(!response.ok) throw new Error(data?.error?.message || `Request failed with status ${response.status}`);

        // Extract and display bot's response text
        const apiResponseText = data?.candidates?.[0]?.content?.parts?.[0]?.text;
        if(!apiResponseText) throw new Error("API returned an empty response");

        const botMessage = apiResponseText.replace(/\*\*(.*?)\*\*/g, "$1").trim();
        messageElement.innerText = botMessage;

        // Add bot response to chat history
        chatHistory.push({
            role: "model",
            parts: [{ text: botMessage }]
        });

    } catch(error) {
        // Log the real error for debugging, but never show API details (keys, quotas) to the user
        console.error(error);

        // Drop the unanswered user message so a retry doesn't resend a broken history
        chatHistory.pop();

        messageElement.innerText = GENERIC_ERROR_MESSAGE;
        messageElement.classList.add("!text-red-700", "dark:!text-red-400");
    } finally {
        // Reset user's file data, removing thinking indicator and scroll chat to bottom
        userData.file = {};
        incomingMessageDiv.classList.remove("thinking");
        chatBody.scrollTo({ top: chatBody.scrollHeight, behavior: "smooth" });
    }
}

// Handle outgoing user message
const handleOutgoingMessage = (e) => {
    e.preventDefault();
    userData.message = messageInput.value.trim();
    messageInput.value = "";
    fileUploadWrapper.classList.remove("file-uploaded");

    // create and display user message
    const messageContent = `<div class="message-text py-3 px-4 max-w-[80%] text-[0.9rem] leading-relaxed bg-user-bubble text-white rounded-bubble-user shadow-user-bubble selection:bg-cyan-500/30"></div>
                            ${userData.file.data ? `<img src="data:${userData.file.mime_type};base64,${userData.file.data}" class="attachment w-28 md:w-36 mt-2 rounded-attachment shadow-attachment" />` : ""}`;

    const outgoingMessageDiv = createMessageElement(
        messageContent,
        "user-message", "flex", "flex-col", "items-end", "animate-message-in", "motion-reduce:animate-none"
    );
    outgoingMessageDiv.querySelector(".message-text").innerText = userData.message;

    chatBody.appendChild(outgoingMessageDiv);
    chatBody.scrollTo({ top: chatBody.scrollHeight, behavior: "smooth" });

    // Simulate bot response with thinking indicator after a delay
    setTimeout(() => {
        const messageContent = `<div class="message bot-message flex gap-3 items-end">
                <div class="relative flex-shrink-0">
                    <img src="./src/assets/botavatar.svg" alt="bot" class="bot-avatar w-9 h-9 p-[6px] fill-white bg-gradient-to-br from-cyan-500 to-teal-600 rounded-full shadow-md">
                </div>

                <div class="message-text py-3 px-4 max-w-[80%] text-[0.9rem] leading-relaxed bg-gradient-to-br from-slate-50 to-cyan-50 dark:from-slate-800 dark:to-cyan-950 text-slate-700 dark:text-slate-100 rounded-2xl rounded-bl-md shadow-sm border border-cyan-100 dark:border-cyan-900/50 selection:bg-cyan-500/30 transition-colors duration-300">
                    <!-- Thinking message -->
                    <div class="thinking-indicator flex gap-1.5 py-1 px-2">
                        <div class="dot h-2 w-2 rounded-full bg-gradient-to-br from-cyan-500 to-teal-600 animate-dot-bounce motion-reduce:animate-none"></div>
                        <div class="dot h-2 w-2 rounded-full bg-gradient-to-br from-cyan-500 to-teal-600 animate-dot-bounce motion-reduce:animate-none [animation-delay:0.2s]"></div>
                        <div class="dot h-2 w-2 rounded-full bg-gradient-to-br from-cyan-500 to-teal-600 animate-dot-bounce motion-reduce:animate-none [animation-delay:0.4s]"></div>
                    </div>
                </div>
            </div>`;

        const incomingMessageDiv = createMessageElement(
            messageContent,
            "bot-message", "animate-message-in", "motion-reduce:animate-none"
        );

        chatBody.appendChild(incomingMessageDiv);
        chatBody.scrollTo({ top: chatBody.scrollHeight, behavior: "smooth" });
        generateBotResponse(incomingMessageDiv);
    }, 600)
}

// Handle error key press for sending messages
messageInput.addEventListener("keydown", (e) => {
    const userMessage = e.target.value.trim();
    if(e.key == "Enter" && userMessage) {
        handleOutgoingMessage(e);
    }
});

// handle file input changes and preview the selected file
fileInput.addEventListener("change", () => {
    const file = fileInput.files[0];
    if(!file) return;

    const render = new FileReader();
    render.onload = (e) => {
        fileUploadWrapper.querySelector("img").src = e.target.result;
        fileUploadWrapper.classList.add("file-uploaded");
        const base64String = e.target.result.split(",")[1];

        // Store file data in userData
        userData.file = {
            data: base64String,
            mime_type: file.type
        }

        console.log(userData);
        fileInput.value = "";
    }

    render.readAsDataURL(file);
})

// Cancel the upload
fileCancelButton.addEventListener("click", () => {
    userData.file = {};
    fileUploadWrapper.classList.remove("file-uploaded");
});

// Initialize emoji picker and handle emoji section
const picker = new EmojiMart.Picker({
    theme: isDarkTheme() ? "dark" : "light",
    skinTonePosition: "none",
    previewPosition: "none",
    onEmojiSelect: (emoji) => {
        const { selectionStart: start, selectionEnd: end } = messageInput;
        messageInput.setRangeText(emoji.native, start, end, "end");
        messageInput.focus();
    },
    onClickOutside: (e) => {
        if(e.target.id === "emoji-picker") {
            document.body.classList.toggle("show-emoji-picker");
        } else {
            document.body.classList.remove("show-emoji-picker");
        }
    }
});

document.querySelector(".chat-form").appendChild(picker);

sendMessageBtn.addEventListener("click", (e) => handleOutgoingMessage(e));
document.querySelector("#file-upload").addEventListener("click", () => fileInput.click());

/* ---------- Chatbox light/dark theme ---------- */
// The `dark` class lives on <html>, but only chatbox elements carry dark:
// variants, so switching repaints the chatbox and leaves the page background alone.
const THEME_KEY = "chatbot-theme";
const themeToggleBtn = document.querySelector("#theme-toggle");
const themeIcon = themeToggleBtn.querySelector(".theme-icon");

function isDarkTheme() {
    return document.documentElement.classList.contains("dark");
}

const applyTheme = (dark, persist = false) => {
    document.documentElement.classList.toggle("dark", dark);
    if(persist) localStorage.setItem(THEME_KEY, dark ? "dark" : "light");

    // Icon shows the mode you'd switch to
    themeIcon.innerText = dark ? "light_mode" : "dark_mode";
    const label = dark ? "Switch to light mode" : "Switch to dark mode";
    themeToggleBtn.setAttribute("aria-label", label);
    themeToggleBtn.title = label;

    // Keep the emoji picker in step with the chatbox
    picker?.update?.({ theme: dark ? "dark" : "light" });
};

// Sync the button with the theme the inline head script already applied
applyTheme(isDarkTheme());

themeToggleBtn.addEventListener("click", () => applyTheme(!isDarkTheme(), true));

<script setup>
import { ref, watch } from 'vue'
import { authService } from '@/services/authService'

const inputUrl = ref('')
const errorMessage = ref('')
const resultMessage = ref('')
const toastMessage = ref('')
const isLoading = ref(false)

// Watch the input and update error message immediately
watch(inputUrl, (newVal) => {
  const trimmedVal = newVal.trim()
  if (trimmedVal !== '' && !isValidURL(trimmedVal)) {
    errorMessage.value = 'Please enter a valid URL'
    resultMessage.value = ''
  } else {
    errorMessage.value = ''
  }
})

function isValidURL(url) {
  const pattern = new RegExp(
    '^(https?:\\/\\/)?' + // protocol
      '((([a-zA-Z0-9-]+)\\.)+[a-zA-Z]{2,})' + // domain name
      '(\\/[a-zA-Z0-9@:%._\\+~#?&//=]*)?$', // path
    'i',
  )
  return pattern.test(url)
}

async function submitForm() {
  let trimmedUrl = inputUrl.value.trim()

  if (!trimmedUrl || !isValidURL(trimmedUrl)) {
    errorMessage.value = 'Please enter a valid URL'
    resultMessage.value = ''
    return
  }

  // Make sure the url has http / https, else we assume it is https
  if (!trimmedUrl.startsWith('http://') && !trimmedUrl.startsWith('https://')) {
    trimmedUrl = 'https://' + trimmedUrl
  }

  errorMessage.value = ''
  isLoading.value = true

  try {
    const accessToken = await authService.getAccessToken()

    const response = await fetch(
      'https://s3m1djw81m.execute-api.ap-southeast-1.amazonaws.com/Prod/surl',
      {
        method: 'POST',
        headers: {
          Authorization: accessToken,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ url: trimmedUrl }),
      },
    )

    if (!response.status == 200) {
      errorMessage.value = 'Failed to shorten URL, please try again.'
      throw new Error('Network response was not ok')
    }

    const result = await response.json()
    resultMessage.value = result.data.shortUrl
  } catch (err) {
    errorMessage.value = 'Unexpected error, please contact us.'
    console.error('Error:', err)
    // enhancement: auto error logging to analytic dashboard
  } finally {
    isLoading.value = false
  }
}

async function copyToClipboard() {
  if (!resultMessage.value) return
  try {
    await navigator.clipboard.writeText(resultMessage.value)
    toastMessage.value = 'Copied to clipboard!'
    setTimeout(() => {
      toastMessage.value = ''
    }, 3000)
  } catch (err) {
    console.error('Failed to copy:', err)
  }
}
</script>

<template>
  <div class="container">
    <h1 class="title">LSS - URL Shortener</h1>
    <form @submit.prevent="submitForm" novalidate>
      <input
        v-model="inputUrl"
        type="url"
        id="textbox"
        name="textbox"
        placeholder="Paste your URL here..."
      />
      <div class="error-label" :class="{ 'error-active': errorMessage }">
        {{ errorMessage }}
      </div>
      <button class="submit-button" type="submit" :disabled="isLoading">
        <span v-if="!isLoading">Shorten URL</span>
        <div v-else class="spinner"></div>
      </button>
    </form>
    <div class="result-box" :class="{ 'result-active': resultMessage }">
      {{ resultMessage }}
    </div>
    <button
      type="button"
      class="copy-button"
      :class="{ 'result-active': resultMessage }"
      @click="copyToClipboard"
    >
      click here to copy the short url
    </button>
    <div class="toast" v-if="toastMessage">
      {{ toastMessage }}
    </div>
  </div>
</template>

<style scoped>
.container,
h1,
form,
input,
button,
div {
  margin: 0;
  padding: 0;
  border: 0;
  box-sizing: border-box;
}

/* Container styling */
.container {
  max-width: 400px;
  min-width: 400px;
  width: 100%;
  padding: 20px;
}

/* Title styling */
.title {
  font-size: 28px;
  font-weight: bold;
  margin-bottom: 20px;
  text-align: center;
  color: #ffffff;
}

/* Input field styling */
input {
  width: 100%;
  padding: 15px;
  font-size: 18px;
  margin-bottom: 10px;
  border-radius: 5px;
  background-color: rgba(0, 0, 0, 0.3);
  color: #ffffff;
}

input::placeholder {
  color: rgba(255, 255, 255, 0.8);
}

input:focus {
  outline: none;
  background-color: rgba(0, 0, 0, 0.4);
}

/* Base error label styling */
.error-label {
  min-height: 40px;
  margin-bottom: 20px;
  display: flex;
  align-items: center;
}

/* Only when error is active, show error styles */
.error-label.error-active {
  font-size: 14px;
  color: #ff4d4d;
  background-color: rgba(0, 0, 0, 0.7);
  padding: 8px;
  border-radius: 5px;
}

/* Submit button styling */
.submit-button {
  width: 50%;
  display: block;
  margin: 0 auto;
  padding: 12px;
  font-size: 16px;
  background-color: #3498db;
  color: #ffffff;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;
  border: none;
}

.submit-button:disabled {
  background-color: #3498db;
  opacity: 0.6;
  cursor: not-allowed;
}

.submit-button:hover:not(:disabled) {
  background-color: #2980b9;
}

/* Spinner styling for the loading state */
.spinner {
  border: 2px solid rgba(255, 255, 255, 0.6);
  border-top: 2px solid #ffffff;
  border-radius: 50%;
  width: 24px;
  height: 24px;
  animation: spin 1s linear infinite;
  margin: 0 auto;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

/* Base result box styling */
.result-box {
  min-height: 60px;
  margin-top: 20px;
  text-align: center;
  font-size: 16px;
  background-color: #ffffff;
  color: #333333;
  padding: 15px;
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  visibility: hidden;
}

/* Copy button styling */
.copy-button {
  background: none;
  border: none;
  color: #000000;
  text-decoration: underline;
  padding: 0;
  margin: 6px auto 0;
  display: block;
  cursor: pointer;
  font-size: 12px;
  visibility: hidden;
}

/* Only when result is active, show result box and copy button styles */
.result-box.result-active,
.copy-button.result-active {
  visibility: visible;
}

/* Toast message styling */
.toast {
  position: fixed;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  background-color: rgba(0, 0, 0, 0.8);
  color: #ffffff;
  padding: 10px 20px;
  border-radius: 5px;
  font-size: 14px;
  z-index: 1000;
  opacity: 0.9;
}
</style>

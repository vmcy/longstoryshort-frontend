<script setup>
import { ref, watch } from 'vue'

const inputUrl = ref('')
const errorMessage = ref('')
const resultMessage = ref('Your shortened URL will appear here...')

// Watch the input and update error message immediately
watch(inputUrl, (newVal) => {
  const trimmedVal = newVal.trim()
  if (trimmedVal !== '' && !isValidURL(trimmedVal)) {
    errorMessage.value = 'Please enter a valid URL.'
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

function submitForm() {
  const trimmedUrl = inputUrl.value.trim()
  if (!trimmedUrl || !isValidURL(trimmedUrl)) {
    errorMessage.value = 'Please enter a valid URL.'
    resultMessage.value = 'Your shortened URL will appear here...'
  } else {
    errorMessage.value = ''
    resultMessage.value = 'Shortened URL: https://short.url/abcd1234'
  }
}
</script>

<template>
  <div class="container">
    <h1 class="title">URL Shortener</h1>
    <form @submit.prevent="submitForm">
      <input
        v-model="inputUrl"
        type="text"
        id="textbox"
        name="textbox"
        placeholder="Paste your URL here..."
      />
      <div class="error-label" :class="{ 'error-active': errorMessage }">
        {{ errorMessage }}
      </div>
      <button type="submit">Shorten URL</button>
    </form>
    <div class="result-box">
      {{ resultMessage }}
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

/* Button styling */
button {
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
  font-weight: bold;
}

button:hover {
  background-color: #2980b9;
}

/* Result box styling */
.result-box {
  padding: 15px;
  font-size: 16px;
  background-color: #ffffff;
  color: #333333;
  border-radius: 5px;
  margin-top: 20px;
  text-align: center;
}
</style>

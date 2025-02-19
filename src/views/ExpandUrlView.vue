<script>
import { onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { authService } from '@/services/authService'

export default {
  setup() {
    const route = useRoute()
    const router = useRouter()

    onMounted(async () => {
      const shortUrlId = route.params.shortid

      try {
        const accessToken = await authService.getAccessToken()

        const response = await fetch(
          `https://s3m1djw81m.execute-api.ap-southeast-1.amazonaws.com/Prod/eurl?shortid=${shortUrlId}`,
          {
            method: 'GET',
            headers: {
              Authorization: accessToken,
            },
          },
        )

        if (!response.ok) {
          router.push('/')
          throw new Error(`HTTP error! status: ${response.status}`)
        }

        const result = await response.json()

        if (result.data.expandUrl) {
          window.location.href = result.data.expandUrl
        } else {
          router.push('/')
        }
      } catch (error) {
        router.push('/')
        console.error('Error fetching data:', error)
      }
    })

    return {}
  },
}
</script>

<template>
  <main>
    <div class="redirect-container">
      <div class="content">
        <div class="spinner"></div>
        <h1>redirecting...</h1>
      </div>
    </div>
  </main>
</template>

<style scoped>
.redirect-container {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  width: 100vw;
  margin: 0;
}

.content {
  display: flex;
  align-items: center;
}

/* Circular Spinner */
.spinner {
  border: 8px solid #f3f3f3;
  border-top: 8px solid #3498db;
  border-radius: 50%;
  width: 50px;
  height: 50px;
  animation: spin 1s linear infinite;
  margin-right: 20px;
}

/* Spinner Animation */
@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

h1 {
  font-size: 3rem;
  font-weight: bold;
  text-align: center;
}
</style>

import { createApp } from 'vue'
import Tres from '@tresjs/core'

import App from './App.vue'
import './assets/css/main.css'

const app = createApp(App)

try {
  // Thử đăng ký plugin
  app.use(Tres)
  
  // KIỂM TRA QUAN TRỌNG: Sau khi đăng ký, hãy kiểm tra xem một component cốt lõi của Tres có thực sự tồn tại không.
  if (app.component('TresCanvas')) {
    // Nếu có, in ra log thành công
    console.log('%c✅ [main.js] Plugin TresJS đã được đăng ký thành công!', 'color: #42b883; font-weight: bold;')
  } else {
    // Nếu không tìm thấy component, coi như đăng ký thất bại
    throw new Error('app.use(Tres) đã chạy nhưng không đăng ký component nào.')
  }

} catch (error) {
  // Nếu có bất kỳ lỗi nào trong quá trình đăng ký, in ra log thất bại
  console.error('❌ [main.js] Đăng ký plugin TresJS THẤT BẠI!', error)
}

app.mount('#app')
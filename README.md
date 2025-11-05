#  Drone Portal Frontend
**Frontend ของระบบ Drone Monitoring**  
สร้างด้วย **Next.js + TailwindCSS + Axios**  
ใช้แสดงข้อมูลโดรน, สถานะ, และบันทึกการบิน (Logs)  
เชื่อมต่อกับ Backend ผ่าน REST API ที่ deploy บน Render

---

##  เทคโนโลยีที่ใช้

| Stack | รายละเอียด |
|-------|-------------|
| **Next.js 14** | เฟรมเวิร์ก React สำหรับ SSR / CSR |
| **Tailwind CSS** | ระบบจัดการ UI ที่เร็วและยืดหยุ่น |
| **Axios** | ใช้เชื่อมต่อ REST API |
| **Vercel** | ระบบ deploy Frontend สำหรับ Next.js โดยเฉพาะ |

---

##  การติดตั้งและเริ่มต้นใช้งาน (Run Local)

```bash
# 1. ดาวน์โหลดโค้ดจาก GitHub
git clone 

# 2. เข้าโฟลเดอร์โปรเจกต์
cd frontend-drone

# 3. ติดตั้ง dependencies
npm install

# 4. รันเซิร์ฟเวอร์ทดสอบ
npm run dev


การ Deploy ขึ้น Vercel

ไปที่ https://vercel.com

กด "New Project"

เลือก repo frontend ของคุณจาก GitHub

ตั้งค่า Environment Variables:

VITE_API_URL=https://drone-back-nuhs.onrender.com

VITE_DRONE_ID=3001

กด Deploy

https://frontdrone.vercel.app

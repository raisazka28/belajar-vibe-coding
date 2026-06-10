import { Elysia } from 'elysia';
import { db } from './db';
import { users } from './db/schema';

const app = new Elysia()
  .get('/', () => ({
    status: 'ok',
    message: 'Hello ElysiaJS is running!',
  }))
  .get('/users', async () => {
    try {
      const allUsers = await db.select().from(users);
      return { success: true, data: allUsers };
    } catch (error: any) {
      return {
        success: false,
        message: 'Gagal mengambil data user. Pastikan MySQL Anda aktif dan kredensial di .env sudah benar.',
        error: error.message,
      };
    }
  })
  .post('/users', async ({ body }: { body: any }) => {
    try {
      const { name, email } = body as { name?: string; email?: string };
      if (!name || !email) {
        return { success: false, message: 'Name dan email wajib diisi.' };
      }
      const result = await db.insert(users).values({
        name,
        email,
      });
      return { success: true, message: 'User berhasil disimpan', result };
    } catch (error: any) {
      return {
        success: false,
        message: 'Gagal menyimpan user. Pastikan MySQL Anda aktif dan skema database sudah di-push.',
        error: error.message,
      };
    }
  })
  .listen(process.env.PORT || 3000);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
export type App = typeof app;

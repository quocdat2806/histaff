# 🐻 Zustand – Hướng dẫn sử dụng (React Native)

Tài liệu này hướng dẫn cách sử dụng **Zustand** trong React Native theo hướng **dễ hiểu – clean code – dễ mở rộng (scalable)**.

---

## 1. Zustand là gì?

**Zustand** là một thư viện quản lý state cho React / React Native theo hướng:

* Nhẹ, đơn giản
* Ít boilerplate
* Dựa trên hook
* Không cần Provider

Zustand giúp giải quyết các vấn đề:

* Props drilling
* Quản lý state toàn cục
* Chia sẻ state giữa nhiều màn hình

---

## 2. Khi nào nên dùng Zustand?

Nên dùng khi:

* State được dùng ở nhiều component / screen
* App có quy mô vừa đến lớn
* Không muốn Redux quá phức tạp

Không nên dùng khi:

* State chỉ dùng trong 1 component nhỏ
* Logic đơn giản, không cần chia sẻ

---

## 3. Cài đặt

```bash
npm install zustand
```

hoặc

```bash
yarn add zustand
```

---

## 4. Tư duy khi dùng Zustand

* **Store**: nơi chứa state + action
* **Component**: chỉ đọc state và gọi action
* Không có reducer
* Không có action type
* Không cần Provider

---

## 5. Cấu trúc Store cơ bản

```ts
import { create } from 'zustand';

interface CounterState {
  count: number;
  increase: () => void;
  decrease: () => void;
}

export const useCounterStore = create<CounterState>((set) => ({
  count: 0,

  increase: () =>
    set((state) => ({ count: state.count + 1 })),

  decrease: () =>
    set((state) => ({ count: state.count - 1 })),
}));
```

---

## 6. Sử dụng Store trong Component

```tsx
const count = useCounterStore((state) => state.count);
const increase = useCounterStore((state) => state.increase);
```

Component sẽ tự động re-render khi phần state được subscribe thay đổi.

---

## 7. Tránh re-render không cần thiết (Best Practice)

❌ Không nên:

```ts
const store = useCounterStore();
```

✅ Nên:

```ts
const count = useCounterStore((state) => state.count);
```

Chỉ subscribe đúng phần state cần dùng.

---

## 8. Update state phức tạp

Zustand không merge object sâu tự động.

```ts
set((state) => ({
  user: {
    ...state.user,
    name: 'Dat',
  },
}));
```

---

## 9. Tách Store theo Feature (Khuyến nghị)

```text
stores/
  auth/
    useAuthStore.ts
  user/
    useUserStore.ts
  cart/
    useCartStore.ts
```

Mỗi feature có store riêng để dễ scale.

---

## 10. Ví dụ Store Auth

```ts
interface AuthState {
  token: string | null;
  isLoggedIn: boolean;
  login: (token: string) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  token: null,
  isLoggedIn: false,

  login: (token) =>
    set({ token, isLoggedIn: true }),

  logout: () =>
    set({ token: null, isLoggedIn: false }),
}));
```

---

## 11. Xử lý Async trong Store

```ts
login: async () => {
  try {
    const token = await loginApi();
    set({ token, isLoggedIn: true });
  } catch (error) {
    console.error(error);
  }
}
```

Khuyến nghị:

* Logic phức tạp → tách sang service / use case

---

## 12. Reset State

```ts
const initialState = {
  count: 0,
};

reset: () => set(initialState)
```

---

## 13. Persist State (Lưu vào Storage)

```ts
import { persist } from 'zustand/middleware';

export const useAuthStore = create(
  persist<AuthState>(
    (set) => ({
      token: null,
      login: (token) => set({ token }),
    }),
    { name: 'auth-storage' }
  )
);
```

Phù hợp cho login, theme, setting.

---

## 14. Những sai lầm thường gặp

* Dùng 1 store cho toàn bộ app
* Nhét quá nhiều logic vào store
* Không tách selector
* Hard-code API trong store

---

## 15. So sánh nhanh với Redux

| Tiêu chí       | Zustand   | Redux      |
| -------------- | --------- | ---------- |
| Boilerplate    | Ít        | Nhiều      |
| Provider       | Không cần | Cần        |
| Async          | Tự do     | Middleware |
| Learning curve | Dễ        | Khó        |

---

## 16. Best Practices tổng kết

* Tách store theo feature
* Component chỉ render UI
* Logic nằm trong store hoặc service
* Dùng selector để tối ưu render
* Không lạm dụng global state

---

## 17. Kết luận

Zustand là giải pháp state management:

* Gọn nhẹ
* Dễ học
* Dễ mở rộng

Phù hợp cho đa số ứng dụng React Native hiện đại.

---

**End of document**

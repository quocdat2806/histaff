# ⚡ React Query – Cách sử dụng trong React Native

Tài liệu này mô tả **cách dùng React Query (@tanstack/react-query)** trong React Native theo hướng **chuẩn production – tối ưu performance – dễ scale**, dựa trên setup provider bạn đang sử dụng.

---

## 1. React Query là gì?

**React Query** là thư viện quản lý **server state** (dữ liệu từ API) giúp:

* Fetch & cache dữ liệu
* Tự động refetch khi cần
* Quản lý loading / error
* Giảm state thủ công trong app

👉 React Query **không thay thế Redux/Zustand**, mà bổ sung:

* Redux/Zustand → client state
* React Query → server state

---

## 2. Khi nào nên dùng React Query?

Nên dùng khi:

* Gọi API REST / GraphQL
* Dữ liệu có cache, stale, refetch
* Nhiều màn hình dùng chung data

Không nên dùng khi:

* State chỉ là UI local (modal, input)
* Dữ liệu không đến từ server

---

## 3. Setup QueryClient (Chuẩn RN)

```ts
const FIVE_MINUTES = 5 * 60 * 1000;
const TEN_MINUTES = 10 * 60 * 1000;

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 2,
      staleTime: FIVE_MINUTES,
      gcTime: TEN_MINUTES,
    },
    mutations: {
      retry: 1,
    },
  },
});
```

### Giải thích cấu hình

* `staleTime`: thời gian data được coi là "fresh"
* `gcTime`: thời gian giữ cache khi không dùng
* `retry`: số lần retry khi API fail
* `refetchOnWindowFocus`: tắt vì RN không có window focus

---

## 4. Kết nối AppState & Network (Rất quan trọng trong RN)

### 4.1 AppState → focusManager

```ts
const onAppStateChange = (status: AppStateStatus) => {
  if (Platform.OS !== 'web') {
    focusManager.setFocused(status === 'active');
  }
};
```

👉 Khi app về foreground → React Query biết để refetch data.

---

### 4.2 Network → onlineManager

```ts
onlineManager.setEventListener(setOnline => {
  const unsubscribe = NetInfo.addEventListener(state => {
    setOnline(Boolean(state.isConnected));
  });

  return unsubscribe;
});
```

👉 React Query tự:

* Pause query khi offline
* Refetch khi online lại

---

## 5. ReactQueryProvider (Root App)

```tsx
export const ReactQueryProvider = ({ children }: PropsWithChildren) => {
  useAppStateListener();
  useOnlineManager();

  return (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  );
};
```

### Cách dùng

```tsx
<ReactQueryProvider>
  <App />
</ReactQueryProvider>
```

---

## 6. Viết hàm gọi API (Service Layer)

❌ Không gọi API trực tiếp trong component.

✅ Nên:

```ts
export const fetchUsers = async () => {
  const res = await api.get('/users');
  return res.data;
};
```

---

## 7. Dùng useQuery

```ts
import { useQuery } from '@tanstack/react-query';

const useUsers = () => {
  return useQuery({
    queryKey: ['users'],
    queryFn: fetchUsers,
  });
};
```

### Trong component

```tsx
const { data, isLoading, error } = useUsers();
```

---

## 8. Query Key – Quy tắc quan trọng

* QueryKey phải:

  * Ổn định
  * Có ngữ nghĩa

```ts
['users']
['user', userId]
['posts', { page, limit }]
```

👉 QueryKey quyết định cache & refetch.

---

## 9. useMutation (POST / PUT / DELETE)

```ts
const useCreateUser = () => {
  return useMutation({
    mutationFn: createUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
    },
  });
};
```

---

## 10. Invalidate & Refetch

```ts
queryClient.invalidateQueries({ queryKey: ['users'] });
```

👉 Dùng khi:

* Data server đã thay đổi
* Cần fetch lại data mới

---

## 11. Xử lý loading & error chuẩn

```tsx
if (isLoading) return <Loading />;
if (error) return <ErrorView />;
```

Không nên check `data === undefined`.

---

## 12. Prefetch data

```ts
queryClient.prefetchQuery({
  queryKey: ['users'],
  queryFn: fetchUsers,
});
```

👉 Dùng cho màn hình tiếp theo.

---

## 13. Best Practices

* Tách query thành custom hook
* Không nhét logic vào component
* Không dùng React Query cho UI state
* Kết hợp Zustand/Redux cho client state

---

## 14. Những sai lầm thường gặp

* Hard-code queryKey
* Dùng React Query thay global state
* Không invalidate sau mutation
* Gọi API trực tiếp trong component

---

## 15. React Query + Clean Architecture

```text
presentation/
  hooks/
    useUsers.ts
application/
  services/
    userService.ts
```

---

## 16. Tổng kết

* React Query quản lý **server state** rất mạnh
* Kết hợp tốt với React Native
* Setup AppState + NetInfo là bắt buộc

👉 Dùng đúng cách sẽ:

* Giảm code
* Giảm bug
* Tăng performance

---

**End of document**

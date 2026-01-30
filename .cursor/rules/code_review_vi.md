# 📐 React Native Coding Rules & Best Practices

Tài liệu này định nghĩa các quy tắc code React Native nhằm đảm bảo **clean code**, **dễ bảo trì**, **dễ mở rộng (scalable)** và **tối ưu hiệu năng** cho dự án.

---

## 1. Không lặp lại logic (DRY)

* Không copy–paste logic giữa các component.
* Logic dùng chung phải được tách ra thành:

  * Function
  * Custom Hook
  * Util / Helper
* Export để tái sử dụng ở nhiều nơi.

---
## 2. Tránh Props Drilling

* Không truyền props qua nhiều cấp component không cần thiết.
* Ưu tiên sử dụng:

  * React Context API
  * State management (Redux, Zustand, Jotai…)
  * Pub/Sub hoặc Event system (khi phù hợp)

---

## 3. Tránh Magic Number / Magic String

* Không hard-code các giá trị số hoặc chuỗi không rõ ý nghĩa.
* Luôn định nghĩa bằng hằng số (`constants`).

---

## 4. Đặt tên biến & hàm rõ ràng

* Tên biến, hàm phải thể hiện rõ mục đích sử dụng.
* Tránh viết tắt khó hiểu hoặc tên chung chung.

---

## 5. Một hàm chỉ làm một nhiệm vụ duy nhất

* Mỗi function chỉ đảm nhận **1 responsibility**.
* Tuân thủ **Single Responsibility Principle (SOLID)**.

---

## 6. Không sửa logic cũ của component dùng chung

* Khi thêm props hoặc tính năng mới:

  * Không được thay đổi hành vi cũ
  * Chỉ mở rộng thêm logic mới
* Đảm bảo backward compatibility.

---

## 7. Quy tắc tách file UI & Style

* Nếu file UI + style object:

  * ≤ 350 dòng → Có thể để chung
  * > 350 dòng → Bắt buộc tách style ra file riêng
* Mỗi component chỉ nên nằm trong **1 file duy nhất**.

---

## 8. Hạn chế import toàn bộ thư viện

* Tránh `import *` hoặc import toàn bộ package.
* Chỉ import đúng phần cần dùng để tối ưu tree shaking.

---

## 9. Hạn chế Inline Style

* Không sử dụng inline style tràn lan trong JSX.
* Chỉ dùng inline style cho các style động nhỏ, đặc biệt.
* Style chính phải nằm trong `StyleSheet.create()`.

---

## 10. Tối ưu performance khi cần thiết

* Sử dụng:

  * `useMemo`
  * `useCallback`
  * `React.memo`
* Không lạm dụng, chỉ dùng khi có vấn đề re-render.

---

## 11. Định nghĩa kiểu dữ liệu rõ ràng

* Props, state, function parameters phải có type.
* Sử dụng `interface` hoặc `type`.
* Hạn chế tối đa việc dùng `any`.

---

## 12. Không hard-code dữ liệu

* Không hard-code:

  * Text
  * URL
  * Config
* Đưa vào file constants, config hoặc env.

---

## 13. Viết code có khả năng mở rộng (Scalable)

* Code phải dễ mở rộng cho các yêu cầu trong tương lai.
* Tránh code chỉ phục vụ cho một case duy nhất.

---

## 14. Ưu tiên Custom Hook cho logic

* Logic xử lý state, side-effect nên đặt trong custom hook.
* Component chỉ tập trung render UI.

---

## 15. Tách rõ UI và Business Logic

* UI: layout, render
* Business logic: hook, service, use case
* Giúp code dễ test và dễ bảo trì.

---

## 16. Không gọi API trực tiếp trong component

* API call phải nằm trong service / repository / use case.
* Component chỉ gọi function đã được abstraction.

---

## 17. Luôn handle loading & error

* Mọi async function phải có xử lý:

  * Loading state
  * Error state
* Không để app crash hoặc fail silent.

---

## 18. Viết code dễ test

* Ưu tiên pure function.
* Tránh logic phụ thuộc trực tiếp vào UI.

---

## 19. Giữ file code gọn gàng

* Import theo thứ tự rõ ràng.
* Không để file quá dài không kiểm soát.
* Sử dụng ESLint + Prettier để format thống nhất.

---

## 20. Code cho con người đọc, không chỉ cho máy chạy

> Code chạy được là chưa đủ.
> Code phải **dễ đọc – dễ hiểu – dễ sửa – dễ mở rộng**.

---

**End of document**

# Toast Bildirimleri Kullanım Rehberi

Bu projede kullanıcı bildirimler için `react-toastify` kullanılmaktadır.

---

## Mevcut Toast'lar

Aşağıdaki toast'lar Redux operasyonlarında tanımlıdır. İlgili `dispatch` çağrısını yaptığınızda toast **otomatik olarak** gösterilir — component'a ek kod yazmanıza gerek yoktur.

| Operasyon | Durum | Mesaj |
|---|---|---|
| `register` | Başarılı | `'Registration successful'` |
| `register` | Hata | Server mesajı veya `'Registration failed'` |
| `logIn` | Başarılı | `'Login successful'` |
| `logIn` | Hata | Server mesajı veya `'Invalid email or password'` |
| `logOut` | Başarılı | `'Logged out successfully'` |
| `logOut` | Hata | Server mesajı veya `'Logout failed'` |
| `fetchDiary` | Hata | Server mesajı veya `'Failed to load diary'` |
| `addProduct` | Başarılı | `'Product added'` |
| `addProduct` | Hata | Server mesajı veya `'Failed to add product'` |
| `removeProduct` | Başarılı | `'Product removed'` |
| `removeProduct` | Hata | Server mesajı veya `'Failed to remove product'` |
| `calculateDailyCalories` | Başarılı | `'Daily calories calculated'` |
| `calculateDailyCalories` | Hata | Server mesajı veya `'Calculation failed'` |

---

## Yeni Toast Eklemek

Yeni bir yerde toast göstermek gerekirse `react-toastify`'dan `toast`'u import et:

```js
import { toast } from 'react-toastify';
```

Kullanım:

```js
toast.success('İşlem başarılı');
toast.error('Bir hata oluştu');
toast.info('Bilgi mesajı');
toast.warn('Uyarı mesajı');
```

### Nereye yazmalı?

- **API isteği içeren işlemlerde** → `src/redux/` altındaki ilgili operasyon dosyasına yaz (`try` içine success, `catch` içine error)
- **Component'a özgü anlık bildirimlerde** → direkt component içine yaz

### Nereye yazmamalı?

- `slice` dosyalarının `extraReducers`'ına yazma — operasyon dosyaları bu iş için daha uygun
- Aynı operasyon için hem operasyona hem component'a yazma — toast çift gösterilir

---

## Örnek

```js
// src/redux/diary/diaryOperations.js
export const addProduct = createAsyncThunk(
  'diary/addProduct',
  async (productData, thunkAPI) => {
    try {
      const { data } = await axiosInstance.post('/diary', productData);
      toast.success('Product added'); // ✅ başarı bildirimi
      return data;
    } catch (error) {
      toast.error(error.response?.data?.message ?? 'Failed to add product'); // ✅ hata bildirimi
      return thunkAPI.rejectWithValue(error.response?.data?.message);
    }
  }
);
```

---

## Notlar

- Tüm toast mesajları **İngilizce** olmalıdır.
- `ToastContainer` `App.jsx`'te tanımlıdır — tekrar ekleme.
- Stiller `index.css`'te projenin renk paletine göre özelleştirilmiştir.

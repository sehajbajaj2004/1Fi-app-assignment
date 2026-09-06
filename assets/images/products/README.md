# Product images

Drop one image per product here, named **exactly** as below (these match each
product's `id` in `app/data/mock/products.json` — the code will `require()`
these exact filenames once they're wired in, so the names must match
precisely, including the `.jpg` extension).

| Filename | Product |
|---|---|
| `p-iphone-15.jpg` | Apple iPhone 15 |
| `p-galaxy-s24.jpg` | Samsung Galaxy S24 |
| `p-macbook-air-m3.jpg` | Apple MacBook Air M3 |
| `p-dell-xps-13.jpg` | Dell XPS 13 |
| `p-re-classic-350.jpg` | Royal Enfield Classic 350 |
| `p-honda-activa.jpg` | Honda Activa 6G |
| `p-swift.jpg` | Maruti Suzuki Swift |
| `p-creta.jpg` | Hyundai Creta |

One image per **product**, not per variant/color — the same photo is used
whichever variant (storage size, color, trim) is selected on the product card
and detail screen.

## Format guidance

- **JPG**, roughly **square** (e.g. 800×800 or larger) — the UI renders these
  in square tiles (`resizeMode="contain"`), so a product shot centered on a
  plain or transparent-looking background will look cleanest, similar to how
  most e-commerce listing photos are cropped.
- If you'd rather use PNG (e.g. for a transparent-background cutout), that's
  fine too — just update the extension in the filename and tell me so I match
  it in code.

Once these are all here, let me know and I'll wire them into `ProductCard`,
`ProductDetailScreen`, and `OrderConfirmationScreen` in place of the current
icon-tile placeholders.

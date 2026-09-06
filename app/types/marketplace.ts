export type Category = {
  id: string;
  name: string;
};

export type ProductVariant = {
  id: string;
  /** Short label shown in the VariantSelector chips, e.g. "128GB · Black", "ZXi+". */
  label: string;
  /** Price in INR (whole rupees), for this specific variant. */
  price: number;
  inStock: boolean;
};

export type Product = {
  id: string;
  categoryId: string;
  name: string;
  brand: string;
  /**
   * No real product photography is available for this assignment (see README
   * "Assumptions"), so products render an icon tile instead of a photo — this is
   * an Ionicons glyph name, kept as a plain string here to avoid coupling the
   * types module to a UI library.
   */
  icon: string;
  description: string;
  /** Short teaser shown on the product card, e.g. "128GB, Black" */
  shortSpec: string;
  variants: ProductVariant[];
};

export type EMIPlan = {
  tenureMonths: number;
  monthlyAmount: number;
  totalPayable: number;
  noCostEmi: boolean;
  /** Total interest baked into totalPayable, for display in the summary strip. */
  interestAmount: number;
};

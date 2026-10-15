// The lint the shipped CI runs (`npm run lint`). The rules at "error"
// are the ones the pipeline's reviewers used to decide by opinion — file
// size, complexity, unused code and `any` — and a machine now decides them
// with a line number instead. Keep them at "error": a warning here changes
// nothing, because nobody reads a warning in a green run.
import js from "@eslint/js";
import tseslint from "typescript-eslint";
import reactHooks from "eslint-plugin-react-hooks";

// An effect whose arrow returns a value hands React that value as its
// cleanup. window.scrollTo returns a Promise in current browsers, so
// `useEffect(() => window.scrollTo(0, 0), [pathname])` crashed every
// page change of a designed site with "destroy is not a function".
const effectBody = {
  selector: "CallExpression[callee.name=/^use(Layout|Insertion)?Effect$/] > ArrowFunctionExpression[expression=true]",
  message: "Give the effect a block body: useEffect(() => { ... }). An arrow that returns a value hands React a cleanup it will call.",
};

export default tseslint.config(
  { ignores: ["dist", "node_modules"] },
  {
    files: ["**/*.{ts,tsx}"],
    extends: [js.configs.recommended, ...tseslint.configs.recommended],
    plugins: { "react-hooks": reactHooks },
    rules: {
      "@typescript-eslint/no-unused-vars": "error",
      "@typescript-eslint/no-explicit-any": "error",
      "max-lines": ["error", { max: 300, skipBlankLines: true, skipComments: true }],
      complexity: ["error", 12],
      "react-hooks/rules-of-hooks": "error",
      "react-hooks/exhaustive-deps": "warn",
      "no-restricted-syntax": ["error", effectBody],
    },
  },
  // Where products are drawn — cards, tiles, product, shop, catalogue and
  // category pages — a raw <img> may not be object-cover. Cover crops the
  // thing being sold: a phone lost its top, a laptop filled its box edge to
  // edge beside a watch floating small, and a cut-out sat in a white box on a
  // dark card. Product pictures go through <ProductImage> (object-contain on
  // the theme's surface). The rule is by file name and by the class on the
  // <img> itself (a string or a template literal), so it has no false alarm
  // outside these files and cannot be dodged by building the class in a
  // template. A photograph that is meant to fill its frame on such a page (a
  // banner, a lifestyle shot) is <Picture className="object-cover"> from
  // src/picture.tsx — the deliberate choice, visible in review.
  // A later block's no-restricted-syntax replaces the earlier one's options,
  // so the effect rule is repeated here.
  {
    files: [
      "src/components/**/*{Card,Tile,Product}*.tsx",
      "src/pages/**/*{Product,Shop,Store,Catalog,Catalogue,Collection,Category}*.tsx",
    ],
    rules: {
      "no-restricted-syntax": [
        "error",
        effectBody,
        {
          selector: "JSXOpeningElement[name.name='img'] > JSXAttribute[name.name='className'] :matches(Literal[value=/\\bobject-cover\\b/], TemplateElement[value.raw=/\\bobject-cover\\b/])",
          message: "A product picture is never object-cover: use <ProductImage src={…} alt={…}/> (src/components/ProductImage.tsx). A photo meant to fill its frame is <Picture className=\"object-cover\">.",
        },
      ],
    },
  },
);

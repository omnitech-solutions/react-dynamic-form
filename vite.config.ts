import path from "path";
import { defineConfig, LibraryFormats } from "vite";
import packageJson from "./package.json";
import visualizer from 'rollup-plugin-visualizer';


type FileName = {
  es: string;
  cjs: string;
  iife: string;
  umd: string;
};

const getPackageName = () => packageJson.name;

const getPackageNameCamelCase = () => {
  const name = getPackageName();
  if (!name) {
    throw new Error("Name property in package.json is missing.");
  }
  return name.replace(/-./g, (char) => char[1].toUpperCase());
};

const fileName: FileName = {
  es: `${getPackageName()}.mjs`,
  cjs: `${getPackageName()}.cjs`,
  iife: `${getPackageName()}.iife.js`,
  umd: `${getPackageName()}.umd.js`
} as const;

const formats: LibraryFormats[] = ["es", "cjs", "iife", "umd"];


export default defineConfig({
  base: "./",
  plugins: [visualizer({
    open: true, // Open the generated HTML graph in the default browser
    gzipSize: true, // Show gzip-compressed sizes
  })],
  build: {
    lib: {
      entry: path.resolve(__dirname, "src/index.ts"),
      name: getPackageNameCamelCase(),
      formats,
     // @ts-ignore
      fileName: (format) => fileName[format],
    },
    rollupOptions: {
      external: ["@oc-tech/lodash-ext"],
      output: {
        manualChunks: undefined,
        globals: {
          // 'lodashExt' is the guessed name; replace it with the correct name
          '@oc-tech/lodash-ext': 'oc-tech-lodash-ext'
        },
      },
    }
  },
});

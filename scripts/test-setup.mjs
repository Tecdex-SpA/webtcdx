/**
 * Resolutor mínimo para el alias `@/*` de tsconfig, de modo que el runner
 * nativo de Node (`node --test`) pueda importar módulos de la app igual que
 * lo hace Next.js. Se carga con `node --import ./scripts/test-setup.mjs`.
 */
import { registerHooks } from "node:module";
import { pathToFileURL } from "node:url";
import path from "node:path";

const SRC_ROOT = path.resolve(import.meta.dirname, "..", "src");

registerHooks({
  resolve(specifier, context, nextResolve) {
    if (specifier.startsWith("@/")) {
      const target = path.join(SRC_ROOT, `${specifier.slice(2)}.ts`);
      return { url: pathToFileURL(target).href, shortCircuit: true };
    }
    return nextResolve(specifier, context);
  },
});

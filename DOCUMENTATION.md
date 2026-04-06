# Documentación Técnica: Landing Page "Samantha AI"

Esta documentación está diseñada para desarrolladores, asesores o futuros mantenedores del proyecto. Explica la arquitectura, las decisiones de diseño y cómo realizar actualizaciones.

---

## 1. Stack Tecnológico

El proyecto está construido utilizando un stack moderno, enfocado en alto rendimiento, SEO y estética moderna:

*   **Framework:** [Next.js (App Router)](https://nextjs.org/) - Utilizado para ruteo, optimización de imágenes (`next/image`) y renderizado del lado del servidor (SSR) para maximizar el SEO.
*   **Lenguaje:** [TypeScript](https://www.typescriptlang.org/) - Tipado estricto para menor cantidad de bugs y mejor experiencia de desarrollo.
*   **Estilos:** [Tailwind CSS](https://tailwindcss.com/) - Uso intensivo de clases utilitarias, incluyendo soporte nativo para `Dark Mode` / `Light Mode` (`dark:bg-zinc-950`).
*   **Animaciones:** [GSAP (GreenSock)](https://gsap.com/) y `@gsap/react` - Animaciones interactivas al hacer scroll (con `ScrollTrigger`), superando en rendimiento a la animación CSS tradicional.
*   **Iconografía:** [Lucide React](https://lucide.dev/) - Biblioteca de íconos SVG limpios, modernos y livianos.

---

## 2. Estructura del Proyecto

El código fuente principal reside en el directorio `src/`:

```text
src/
├── app/                  # (App Router)
│   ├── layout.tsx        # Layout principal (Navbar y configuración de ThemeProvider)
│   ├── page.tsx          # Estructura principal de la Landing Page
│   ├── terminos/         # Página legal: Términos y Condiciones
│   ├── privacidad/       # Página legal: Política de Privacidad
│   └── globals.css       # Estilos globales y variables de Tailwind
│
├── components/           # Componentes aislados de React
│   ├── Navbar.tsx        # Navegación y switch de Light/Dark Mode
│   ├── Hero.tsx          # Título principal y mascota glitch (Samap1-4)
│   ├── Features.tsx      # Características (Usa M1.png - Robot ajustado de lado)
│   ├── HowItWorks.tsx    # Pasos de implementación
│   ├── WhySamantha.tsx   # Comparativa "Bento Grid" Humanos vs IA
│   ├── Pricing.tsx       # Planes y levitación suave (Usa M2.png - Robot con datafono)
│   ├── FAQ.tsx           # Sección interactiva (Chat Mode)
│   └── Footer.tsx        # Enlaces legales y llamadas a la acción
│
└── components/ui/        # (Si aplica) Componentes genéricos o de terceros
```

---

## 3. Guía de Animaciones (GSAP)

El sitio utiliza **GSAP** para todas las animaciones principales. La regla general del proyecto es:
1. Usar siempre el hook `useGSAP` dentro del scope del contenedor principal (`containerRef`) para limpieza automática de memoria.
2. Definir las opacidades iniciales a `0` (vía clases Tailwind como `opacity-0`) para evitar "flashes" de contenido antes de que cargue la animación.

**Ejemplo de cómo actualizar animaciones (ej. `Pricing.tsx` o `WhySamantha.tsx`):**
*   Para ajustar velocidad o intensidad, busca el objeto GSAP (ej. `y: -5`, `duration: 3.5`).
*   Se usan líneas de tiempo (`gsap.timeline`) para encadenar animaciones ordenadas de manera perfecta.

---

## 4. Gestión de Imágenes y Mascotas (Assets)

Las imágenes de la mascota ("Samantha") se manejan a través de rutas en la carpeta `public/` e hidratan la página mediante `<Image />` de Next.js, lo cual asegura carga perezosa (lazy loading).

*   `M1.png`: Usado en `Features.tsx`. Ajustado de forma absoluta para dar la ilusión de "apoyarse" sobre las tarjetas.
*   `M2.png`: Usado en `Pricing.tsx`. Se ubica absolutamente sobre la tabla de precios y cuenta con una animación GSAP de "levitación infinita".
*   `Samap1.png` a `Samap4.png`: Utilizados en el efecto tipo "Holograma/Glitch" y en el "Chat interactivo" de `FAQ.tsx`.

> 💡 **Nota de actualización:** Si el diseño de la mascota cambia, simplemente reemplaza los archivos en `public/` respetando las dimensiones y proporciones para no romper el CSS.

---

## 5. Modo Claro / Modo Oscuro

El sitio completo tiene soporte dual de "Theming". Las reglas clave para actualizar el código:

1.  Para el modo claro, se usan los colores por defecto (ej. `bg-white`, `border-gray-200`, `text-gray-900`).
2.  Para el modo oscuro, **siempre** usar el prefijo `dark:` (ej. `dark:bg-zinc-950`, `dark:border-zinc-800`, `dark:text-white`).

Todo componente nuevo DEBE probarse en ambos modos.

---

## 6. Mantenimiento y Extensión

### Añadir una nueva sección
1.  Crear el archivo en `src/components/MiNuevaSeccion.tsx`.
2.  Aplicar un padding estructural como `py-24 md:py-32` para mantener consistencia.
3.  Importar e inyectar en el flujo del archivo `src/app/page.tsx`.

### Cambiar de Precios (Stripe / MercadoPago)
El componente `Pricing.tsx` actualmente es visual. Para agregar pasarelas de pago futuras, se recomienda envolver los botones "Comenzar Ahora" en componentes `<form>` que ejecuten Server Actions de Next.js (`use server`) o redirijan al checkout de la pasarela seleccionada.

### Actualizar Enlaces Legales
Los enlaces principales a términos ("Términos de Servicio" y "Política de Privacidad") existen como páginas funcionales en `src/app/terminos/page.tsx` y `src/app/privacidad/page.tsx`. Editar estos componentes actualizará instantáneamente las rutas.

---
*Documentación generada para facilitar el ciclo 2026+ del sistema Samantha.*

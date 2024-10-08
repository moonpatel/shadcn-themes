export default function generateCssCode(theme: ThemeConfig) {
  const lightTheme = theme.light;
  const darkTheme = theme.dark;

  const lightCss = Object.keys(lightTheme)
    .map((key) => {
      return `        ${key}: ${lightTheme[key]};`;
    })
    .concat(`        --radius: 0.5rem;`);

  const darkCss = Object.keys(darkTheme).map((key) => {
    return `        ${key}: ${darkTheme[key]};`;
  });

  return `@layer base {
    :root {
${lightCss.join("\n")}
    }

    .dark {
${darkCss.join("\n")}
    }
}`;
}

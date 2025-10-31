# Guía de Contribución

¡Gracias por tu interés en contribuir a Yoo2Back! Este documento proporciona pautas para contribuir al proyecto.

## Cómo Contribuir

### Reportar Bugs

Si encuentras un bug, por favor abre un issue con:

- Descripción clara del problema
- Pasos para reproducirlo
- Comportamiento esperado vs. comportamiento actual
- Versión de Node.js y sistema operativo
- Capturas de pantalla (si aplica)

### Sugerir Mejoras

Para sugerir una nueva característica:

1. Verifica que no exista ya un issue similar
2. Describe claramente la funcionalidad propuesta
3. Explica por qué sería útil
4. Proporciona ejemplos de uso si es posible

### Pull Requests

1. **Fork** el repositorio
2. **Crea una rama** para tu característica:
   ```bash
   git checkout -b feature/mi-nueva-caracteristica
   ```
3. **Realiza tus cambios**:
   - Escribe código limpio y bien documentado
   - Sigue el estilo de código existente
   - Añade comentarios donde sea necesario
4. **Prueba tus cambios**:
   - Verifica que el código funcione correctamente
   - Prueba tanto CLI como GUI si aplica
5. **Commit tus cambios**:
   ```bash
   git commit -m "feat: descripción clara del cambio"
   ```
6. **Push a tu fork**:
   ```bash
   git push origin feature/mi-nueva-caracteristica
   ```
7. **Abre un Pull Request**

## Estándares de Código

### JavaScript

- Use `const` y `let` en lugar de `var`
- Use funciones arrow cuando sea apropiado
- Mantenga las funciones pequeñas y enfocadas
- Use nombres descriptivos para variables y funciones
- Maneje errores apropiadamente con try-catch

### Mensajes de Commit

Usamos mensajes de commit convencionales:

- `feat:` - Nueva característica
- `fix:` - Corrección de bug
- `docs:` - Cambios en documentación
- `style:` - Formateo, punto y coma faltantes, etc.
- `refactor:` - Refactorización de código
- `test:` - Añadir tests
- `chore:` - Mantenimiento

Ejemplo: `feat: añadir soporte para listas de reproducción`

## Estructura del Proyecto

```
Yoo2Back/
├── src/
│   ├── index.js       # Aplicación Electron principal
│   ├── preload.js     # Script de precarga
│   ├── cli.js         # Interfaz CLI
│   └── downloader.js  # Lógica de descarga
├── gui/
│   ├── index.html     # Interfaz gráfica
│   └── renderer.js    # Lógica del renderer
├── examples/          # Ejemplos de uso
└── README.md
```

## Desarrollo Local

1. Clonar el repositorio:
   ```bash
   git clone https://github.com/DavidValSep/Yoo2Back.git
   cd Yoo2Back
   ```

2. Instalar dependencias:
   ```bash
   npm install
   ```

3. Probar CLI:
   ```bash
   npm run cli -- info <URL>
   ```

4. Probar GUI:
   ```bash
   npm start
   ```

## Preguntas

Si tienes preguntas sobre cómo contribuir, no dudes en abrir un issue con la etiqueta `question`.

## Código de Conducta

- Sé respetuoso con otros colaboradores
- Acepta críticas constructivas
- Enfócate en lo que es mejor para el proyecto
- Muestra empatía hacia otros miembros de la comunidad

## Licencia

Al contribuir, aceptas que tus contribuciones se licenciarán bajo la Licencia MIT del proyecto.

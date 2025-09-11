# ✊✋✌️ Piedra, Papel o Tijera - Deployment en AWS EC2
![AWS EC2](https://img.shields.io/badge/deploy-AWS%20EC2-orange?logo=amazon-aws)
![JavaScript CI](https://github.com/eydrien/PiedraPapelTijeraGame/workflows/JavaScript%20CI/badge.svg)

Una aplicación web simple del clásico juego **Piedra, Papel o Tijera**, desplegada en **Amazon EC2** usando **Python HTTP Server**.

---

## 📋 Descripción del Proyecto
Aplicación **HTML, CSS y JavaScript Vanilla** con las siguientes características:

✅ Selección de jugada mediante botones (piedra, papel o tijera)  
✅ Generación automática de jugada por parte del bot  
✅ Resultado en tiempo real (ganaste, perdiste o empate)  
✅ Interfaz sencilla y ligera para navegador  
✅ Despliegue rápido en AWS EC2 usando servidor HTTP nativo de Python  

---

## 🛠️ Tecnologías Utilizadas
- **Frontend:** HTML5, CSS3, JavaScript (Vanilla)  
- **Servidor:** Python HTTP Server  
- **Cloud:** AWS EC2 (Ubuntu 22.04 LTS)  
- **Conexión:** AWS Session Manager  
- **Almacenamiento:** Sin base de datos (lógica en memoria)  

---
<img width="1341" height="854" alt="image" src="https://github.com/user-attachments/assets/ae830b06-6977-4fe0-ac45-07be507c6655" />

## 🚀 Configuración de AWS EC2

### Especificaciones de la Instancia
- **Nombre:** piedra-papel-tijera-game  
- **AMI:** Ubuntu Server 22.04 LTS (Free tier eligible)  
- **Instance Type:** t2.micro (Free tier eligible)  
- **Key Pair:** Sin key pair (usando Session Manager)  

### Security Group Configuration
| Tipo       | Puerto | Protocolo | Origen     | Descripción            |
|------------|--------|-----------|------------|------------------------|
| Custom TCP | 8000   | TCP       | 0.0.0.0/0  | Python HTTP Server     |

**Nota:** No se requiere puerto SSH (22) ya que usamos AWS Session Manager para la conexión.  

---

## 🛠️ Configuración del Servidor

### 1. Conectar a la Instancia
Desde la consola de AWS EC2:
1. Seleccionar la instancia  
2. Clic en **Connect**  
3. Pestaña **Session Manager**  
4. Clic en **Connect**  

### 2. Actualizar el Sistema
```bash
sudo apt update && sudo apt upgrade -y
```

### 3. Clonar el Repositorio
```bash
git clone https://github.com/eydrien/PiedraPapelTijeraGame.git
```

### 4. Navegar al Directorio de la Aplicación
```bash
cd PiedraPapelTijeraGame
```

---

## 🌐 Ejecutar la Aplicación

### Servidor Python (Desarrollo)
```bash
python3 -m http.server 8000
```

### Acceso a la Aplicación
1. Obtener la **IP pública** de la instancia EC2  
2. Abrir navegador en:  

```
http://TU-IP-PUBLICA:8000
```

---
## ⚙️ Configurar automatización básica con GitHub Actions

Para asegurarnos de que la aplicación se valide automáticamente cada vez que se suben cambios al repositorio, podemos usar **GitHub Actions**.

### Pasos principales:

1. **Crear una carpeta de workflows**  
   En la raíz del proyecto, crea la ruta:
```bash
.github/workflows/
```  

2. **Crear un workflow simple**  
Dentro de esa carpeta, crea un archivo llamado `ci.yml`.  
Este archivo define las acciones que se ejecutarán de forma automática cuando hagas un *push* o un *pull request* a la rama principal (`main`).  

3. **Configurar validaciones básicas**  
Según la tecnología del proyecto, puedes incluir pasos como:  
- **Instalar dependencias** (ej: `npm install` si usas Node.js, o `pip install -r requirements.txt` en Python).  
- **Ejecutar pruebas automáticas** (si tienes un directorio `test/` con pruebas).  
- **Verificar sintaxis** de tu código (ej: `eslint` para JS, `htmlhint` para HTML). 
---

## 📁 Estructura del Proyecto
```
PiedraPapelTijeraGame/
├── .github/
│   └── workflows/
│       └── javascript.yml        # Workflow de GitHub Actions (automatización básica)
│
├── test/                 # Carpeta reservada para pruebas (futuro)
│   └── basic.test.js     # Ejemplo de test (placeholder)
│
├── index.html            # Interfaz principal del juego
├── style.css             # Estilos básicos
├── script.js             # Lógica del juego
└── README.md             # Información y documentación del proyecto
```

---

## 🔮 Futuras Implementaciones
- Migrar a **Nginx** como servidor web (puerto 80)  


---

## ⚠️ Puntos a Considerar
- El uso de `python3 -m http.server` es solo para **pruebas y desarrollo**, no producción.  
- Si se cierra la sesión SSH/Session Manager, el servidor se detiene.  
  - Se puede usar:  
    ```bash
    nohup python3 -m http.server 8000 
    ```  
    para dejarlo corriendo en segundo plano.
    se puede cargar cualquier proyecto sencillo estatico al levantar el servidor de python
- El proyecto actualmente no tiene persistencia de datos ni backend real.

- Recomendacion, en el grupo de seguridad no debe quitacer el que trabaja en el puerto 22 ssh. ya q sin eso no se puede conectar la instanacia
- Tampoco es recomendable cambiar el nombre mientras esta corriendo la instancia ya que puede generar errores inesperados. 
- Si se cierra la sesión SSH/Session Manager, el servidor se detiene.  
  

---
✍️ **Autor:** [eydrien](https://github.com/eydrien)  

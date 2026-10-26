# 📱 Pro Recorder — Android Screen Recorder & UI Design Studio

A premium, modern Android screen recorder with an interactive **UI Design Studio**, 6 curated themes, customizable color palettes, and an automated **GitHub Actions CI/CD pipeline** to build your Android APK with zero errors.

---

## 🚀 GitHub Par Upload Karke APK Build Kaise Kare (Step-by-Step Guide)

Agar aapko is project ko GitHub par daal kar automatically Android APK banana hai, toh niche diye gaye steps follow kare. Sabhi steps test kiye gaye hain taaki build me koi error ya problem na aaye (**sab fix rahe**).

---

### Step 1: GitHub Par Naya Repository Banaye
1. [GitHub](https://github.com) par login kare.
2. Top right corner me **`+`** icon par click karke **"New repository"** select kare.
3. Repository name daale: `pro-recorder` (ya koi bhi manpasand naam).
4. Repository ko **Public** ya **Private** choose kare.
5. **"Create repository"** button par click kare.

---

### Step 2: Code Ko GitHub Par Push Kare (Terminal Commands)
Apne computer ke terminal / command prompt me project folder me jakar ye commands run kare:

```bash
# 1. Git initialize kare
git init

# 2. Saari files add kare
git add .

# 3. Pehla commit kare
git commit -m "Initial commit - Pro Recorder with GitHub Actions APK CI"

# 4. Main branch set kare
git branch -M main

# 5. Apne GitHub repository ka URL connect kare (USERNAME aur REPO_NAME change kare)
git remote add origin https://github.com/mrhellgodji/pro-recorder.git

# 6. GitHub par code push kare
git push -u origin main
```

> 💡 **Important Git Fix**: Agar Linux/Mac use kar rahe hain toh gradlew file ko executable permission dene ke liye ye command chala sakte hain:
> ```bash
> git update-index --chmod=+x gradlew
> git commit -m "Fix gradlew executable permissions"
> git push origin main
> ```

---

### Step 3: GitHub Actions APK Build Pipeline (Automatic Execution)

Jaise hi aap code push karenge, GitHub Actions automatic workflow start kar dega. Workflow file `.github/workflows/build-apk.yml` me pehle se configure hai.

Ye pipeline niche diye gaye **exact steps** follow karta hai:

1. **Set up job**: GitHub Actions runner (Ubuntu) initialize hota hai.
2. **Checkout Repository**: Code repository se clone kiya jata hai (`actions/checkout@v4`).
3. **Set up JDK 17**: Eclipse Temurin Java 17 configure hota hai (`actions/setup-java@v4`).
4. **Setup Android SDK & Accept Licenses**: Pre-installed Android SDK (`/usr/local/lib/android/sdk`) ko `local.properties` ke saath map kiya jata hai aur saare license hashes automatically inject ho jaate hain (No third-party action crash!).
5. **Setup Gradle**: Gradle 8.5 build tool setup hota hai (`gradle/actions/setup-gradle@v3`).
6. **Generate Wrapper and Build Android Debug APK**: `./gradlew assembleDebug` run hota hai aur APK compile hoti hai.
7. **Prepare APK for Distribution**: Output APK ko `output_apks/ProRecorder-debug.apk` me copy kiya jata hai.
8. **Upload Public APK Artifact**: Compiled APK artifact upload ho jati hai (`actions/upload-artifact@v4`).
9. **Publish Public GitHub Release**: Agar tag push kiya hai ya manual run kiya hai, toh direct GitHub Release ban jati hai.
10. **Post Set up JDK 17** & **Post Checkout Repository**: Cache aur resources clean up hote hain.
11. **Complete job**: Build success ho jati hai!

---

### Step 4: Built APK Download Kaise Kare

1. Apne GitHub repository page par jaye.
2. Top tabs me **"Actions"** tab par click kare.
3. Left side me **"Android CI - Build & Release APK"** workflow par click kare.
4. Sabse upar latest run (Green checkmark ✅) par click kare.
5. Page ke bottom par **"Artifacts"** section me jaye.
6. **`ProRecorder-Android-APK`** par click karke zip file download kare.
7. Zip ko extract kare — aapko **`ProRecorder-debug.apk`** mil jayega! Apne Android phone me install kare aur test kare!

---

### Step 5: Direct GitHub Release Se APK Download Karna (Optional)
Agar aap chahte hain ki APK direct "Releases" section me download ke liye available ho:

```bash
git tag v1.0.0
git push origin v1.0.0
```
Tag push karte hi GitHub Actions automatically **Release v1.0.0** create kar dega aur `ProRecorder-debug.apk` direct download button ke saath publish ho jayegi!

---

## 🛠️ Build Me Aane Wali Common Problems Aur Unke Fixes (All Fixed)

Agar build me koi bhi error aata hai, toh yaha sabhi tested solutions hain:

| Problem / Error | Cause | Fix / Solution (Included in Workflow) |
|---|---|---|
| **Setup Android SDK problem / crash** | 3rd party `setup-android` action fail hoti hai ya SDK path unset hota hai | **FIXED**: GitHub runner ke pre-installed SDK (`/usr/local/lib/android/sdk`) ko use kiya hai aur `local.properties` me `sdk.dir` auto-write hota hai. |
| `SDK location not found / ANDROID_HOME` | Gradle ko Android SDK folder nahi milta | **FIXED**: Workflow step me `echo "sdk.dir=$ANDROID_HOME" > local.properties` create hota hai. |
| `You have not accepted the license agreements of Android SDK` | CI runner licenses accept nahi karta | **FIXED**: License hashes direct `$ANDROID_HOME/licenses/android-sdk-license` me inject hote hain aur `sdkmanager --licenses` run hota hai. |
| `gradlew: Permission denied` | Git me gradlew file execute permission me nahi hai | **FIXED**: Workflow me `chmod +x gradlew` laga diya hai, aur `git update-index --chmod=+x gradlew` kar sakte hain. |
| `Unsupported class file major version 65 / JDK mismatch` | Gradle purane Java version se run ho raha hai | **FIXED**: JDK 17 (`temurin`) strictly configure kiya hai jo AGP 8.x ke liye compatible hai. |
| `FOREGROUND_SERVICE_MEDIA_PROJECTION missing` | Android 14 (API 34) me screen record permission required hai | **FIXED**: `AndroidManifest.xml` me `FOREGROUND_SERVICE_MEDIA_PROJECTION` aur `RECORD_AUDIO` add kiya gaya hai. |
| `Resource not accessible by integration (403)` | GitHub token me release write permission nahi hai | **FIXED**: Workflow me `permissions: contents: write` add kar diya gaya hai. |


---

## 🎨 UI Design Studio Features

Web applet ke andar aap design customize kar sakte hain:
- **6 Built-in Themes**: Midnight Pro, Cyber Neon, Minimal White, Creator Purple, Gaming Red, Glass Premium.
- **Color Customizer**: Primary, Secondary, Background, REC Dot colors live change kare.
- **UX Customizer**: Button shape, corner radius ($6\text{px}$–$28\text{px}$), card style (Glass, Bordered, Elevated, Flat).
- **8 Complete Screens**:
  - Home Dashboard (Resolution 4K/1080p, Framerate, Audio source, Storage gauge)
  - Full-Screen Recording (Live timer, canvas annotation drawing, facecam, audio meter)
  - Custom Area Selection (Resizable crop box, 9:16 / 16:9 aspect ratios)
  - Audio Settings (Internal sound + Mic mixing, gain slider, live VU meter)
  - Facecam Settings (Circle, Square, Rounded, Hexagon shapes, neon glow)
  - Recordings Gallery (Video preview player, search, tags, delete)
  - Video Editor (Timeline trimmer, playback speed, export presets)
  - General Settings (Theme selector, countdown timer, encoder H.264/HEVC)
- **Jetpack Compose Code Generator**: Current active theme ka Kotlin `Theme.kt` code generate karta hai.

---

## 📂 Project Structure

```
├── .github/
│   └── workflows/
│       └── build-apk.yml          # GitHub Actions CI/CD Automated APK Builder
├── app/
│   ├── build.gradle               # Android App Module Gradle (API 34, Jetpack Compose)
│   └── src/
│       └── main/
│           ├── AndroidManifest.xml # MediaProjection & Audio Permissions
│           └── java/com/prorecorder/app/
│               ├── MainActivity.kt # Jetpack Compose UI
│               └── service/
│                   └── ScreenRecorderService.kt # Foreground Recording Service
├── build.gradle                   # Top-level Gradle config
├── settings.gradle                # Gradle module settings
├── gradle/wrapper/
│   └── gradle-wrapper.properties  # Gradle 8.5 distribution
├── src/                           # React + TypeScript UI Design Studio Web App
│   ├── components/                # 8 Interactive Android Screens & Studio
│   ├── context/ThemeContext.tsx   # Centralized Design Tokens & Persistence
│   └── types/theme.ts             # Theme Presets
├── package.json
└── README.md
```

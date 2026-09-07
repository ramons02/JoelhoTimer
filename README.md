# Joelho Timer

Timer de execução/descanso para reabilitação de joelho, com apps nativos para Android e iOS via Capacitor.

## Funcionalidades

- Configuração de tempo de **execução**, **descanso** e número de **ciclos**
- Alertas sonoros distintos para início de execução, descanso e conclusão
- Salva a última configuração usada (localStorage) para reabrir já preenchida
- Controles de iniciar, pausar e resetar

## Estrutura do projeto

```
www/            Código-fonte web (HTML/CSS/JS) — fonte de verdade da UI
  index.html
  css/style.css
  js/app.js
  assets/       Imagens, ícones e sons
android/        Projeto nativo Android gerado pelo Capacitor
ios/            Projeto nativo iOS gerado pelo Capacitor
resources/      Ícone e splash screen de origem (usados para gerar os assets nativos)
capacitor.config.json
```

## Rodando no navegador

Basta abrir `www/index.html` em um navegador, ou servir a pasta `www/` com qualquer servidor estático.

## Rodando como app nativo

Pré-requisitos: Node.js, Android Studio (para Android) e/ou Xcode (para iOS, apenas macOS).

```bash
npm install

# Sincroniza o conteúdo de www/ com os projetos nativos
npm run sync

# Abre o projeto no Android Studio
npm run android

# Abre o projeto no Xcode
npm run ios
```

Qualquer alteração em `www/` precisa de `npm run sync` para refletir nos apps nativos.

## Build assinado (Android)

O `android/app/build.gradle` lê as credenciais de assinatura de `android/keystore.properties`, que **não é versionado**. Para gerar um APK/AAB assinado, crie esse arquivo localmente com:

```properties
storeFile=caminho/para/sua.keystore
storePassword=SUA_SENHA
keyAlias=SEU_ALIAS
keyPassword=SUA_SENHA_DA_CHAVE
```

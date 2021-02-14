
<h4 align="center"><strong>MOBILE</strong></h4>

>**SOMENTE ANDROID**

<ul>
  <li>Faça clone deste repositório</li>
  <li>Acesse a pasta <b>marvel</b> e siga os passos abaixo para instalar as dependências do projeto</li>
</ul>


1. Instalação de dependencias

```
yarn
```

1.1. Abra duas abas do terminal

1.1. Connecte o celular via usb liberando acesso para transmissão de arquivo por esta porta ou utilize um emulador de ANDROID. 

3. Rode o comando em uma aba do terminal

```
yarn start
```

4. Rode este outros comando em outra aba do terminal

```
$ adb reverse tcp:8081 tcp:8081

```

4.1. Caso utilize o genymotion rode

```
$ adb connect IP_DO_SEU_EMULADOR:5555
```

5. Rode o comando para instalar no aparelho / emulador

```
$ yarn android

```

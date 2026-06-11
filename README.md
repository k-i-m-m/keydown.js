# keydown-id

## 한국어

HTML 요소의 `data-kd-sc`와 `data-kd-ac`를 읽어 키보드 `keydown` 이벤트를 요소의 동작에 연결하는 작은 브라우저 라이브러리입니다.

별도의 이벤트 리스너를 반복해서 작성하지 않고, HTML 속성만으로 표시, 숨김, 토글, 클릭 동작을 선언할 수 있습니다.

현재 배포 버전은 `v2.0.0`입니다.

## 시작하기

배포 파일을 HTML에 추가하면 문서가 준비된 뒤 자동으로 키 매핑을 수집하고 실행을 시작합니다.

```html
<script src="https://cdn.jsdelivr.net/gh/k-i-m-m/keydown.js@v2.0.0/dist/keydown.v2.0.0.js"></script>
```

키를 연결할 요소에는 단축키를 `data-kd-sc`로, 실행할 동작을 `data-kd-ac`로 지정합니다. 요소의 기존 `id`는 자유롭게 유지할 수 있습니다.

```html
<div id="menu" data-kd-sc="space" data-kd-ac="toggle">
  Space 키로 열고 닫기
</div>

<div id="notice" data-kd-sc="esc" data-kd-ac="hide">
  Esc 키로 숨기기
</div>

<button id="save" data-kd-sc="control+shift+k" data-kd-ac="click">
  Control + Shift + K
</button>

<script src="https://cdn.jsdelivr.net/gh/k-i-m-m/keydown.js@v2.0.0/dist/keydown.v2.0.0.js"></script>
```

## 속성 작성 규칙

기본 형식은 다음과 같습니다.

```text
data-kd-sc="<키 또는 조합키>"
data-kd-ac="<액션>"
```

단일 키는 `space`, `enter`, `a`처럼 작성합니다.

조합 키는 `+`로 연결합니다.

```html
<button data-kd-sc="control+s" data-kd-ac="click">저장</button>
<button data-kd-sc="meta+shift+p" data-kd-ac="click">명령 실행</button>
```

같은 키를 여러 요소에 연결할 수 있습니다. 선택적으로 `--` 뒤에 구분용 라벨을 추가할 수 있으며, 라벨은 키 매핑에 영향을 주지 않습니다.

```html
<div data-kd-sc="esc--notice" data-kd-ac="hide">공지 닫기</div>
<div data-kd-sc="esc--dialog" data-kd-ac="hide">대화상자 닫기</div>
```

같은 키에 연결된 유효한 요소가 여러 개라면 해당 요소의 액션이 모두 실행됩니다.

## 기본 액션

### `show`

요소를 표시합니다. 기본 표시 값은 `block`입니다.

```html
<div data-kd-sc="f1" data-kd-ac="show">도움말</div>
```

### `hide`

요소에 `display: none`을 적용합니다.

```html
<div data-kd-sc="esc" data-kd-ac="hide">닫을 요소</div>
```

### `toggle`

요소의 표시 상태를 전환합니다.

```html
<nav data-kd-sc="control+m" data-kd-ac="toggle">메뉴</nav>
```

### `click`

키를 누른 시점의 마우스 포인터 위치에 있는 요소에 `click()`을 호출합니다. 포인터 위치를 확인할 수 없는 경우 마지막 포인터 대상 또는 키가 매핑된 요소를 클릭합니다.

```html
<button data-kd-sc="enter" data-kd-ac="click">실행</button>
```

## 표시 방식 지정

`show` 또는 `toggle` 액션으로 요소를 표시할 때 `block`이 아닌 다른 `display` 값이 필요하면 `data-kd-display`를 지정합니다.

```html
<div data-kd-sc="f2" data-kd-ac="toggle" data-kd-display="flex">
  Flex 레이아웃
</div>

<div data-kd-sc="f3" data-kd-ac="show" data-kd-display="grid">
  Grid 레이아웃
</div>
```

## 지원 키

### 문자와 숫자

```text
a ... z
0 ... 9
```

### 숫자패드

숫자패드 키는 `num-` 접두사를 사용합니다.

```text
num-0 ... num-9
num-enter
num-add
num-subtract
num-multiply
num-divide
num-decimal
```

### Function 키

```text
f1 ... f24
```

키보드 설정에 따라 Function 키를 사용하기 위해 `Fn`을 함께 눌러야 할 수 있지만, 하드웨어 보조 키인 `Fn` 자체는 매핑하지 않습니다.

### 수정 키

```text
control
alt
shift
meta
```

조합 키의 수정 키 순서는 내부적으로 `control`, `alt`, `shift`, `meta` 순서로 정규화됩니다.

### 공통 키

```text
escape
space
enter
backspace
tab
capslock
delete
insert
home
end
pageup
pagedown
arrowup
arrowdown
arrowleft
arrowright
contextmenu
printscreen
scrolllock
pause
numlock
```

### 문장부호 키

```text
minus
equal
bracket-left
bracket-right
backslash
semicolon
quote
backquote
comma
period
slash
```

## 키 별칭

운영체제와 키보드 표기에 따라 다음 별칭을 사용할 수 있습니다.

| 별칭 | 처리되는 키 |
| --- | --- |
| `cmd`, `command` | `meta` |
| `ctrl`, `ctl` | `control` |
| `option`, `opt` | `alt` |
| `esc` | `escape` |
| `return` | `enter` |
| `spacebar` | `space` |
| `del` | `delete` |
| `bksp` | `backspace` |
| `up`, `down`, `left`, `right` | 각 방향키 |

Windows 키는 `meta`, macOS Command 키는 `meta` 또는 `cmd`, macOS Option 키는 `alt` 또는 `option`으로 작성합니다.

## 브라우저 기본 동작

매핑된 요소에는 라이브러리가 `data-kd-prevent-default="true"`를 자동으로 추가합니다. 유효한 액션이 실행되면 해당 키의 브라우저 기본 동작을 차단합니다.

특정 요소에서 기본 동작 차단을 원하지 않으면 자동 시작 대신 컨트롤러를 직접 생성하고 `autoPreventDefault` 옵션을 끌 수 있습니다.

```js
window.keydownJS.controller.stop();

const controller = window.keydownJS.createKeydown({
  autoPreventDefault: false
}).start();
```

모든 실행된 매핑에서 기본 동작을 차단하려면 `preventDefault` 옵션을 사용할 수 있습니다.

```js
window.keydownJS.controller.stop();

const controller = window.keydownJS.createKeydown({
  preventDefault: true
}).start();
```

## 입력 요소 보호

일반적인 텍스트 입력을 방해하지 않도록 다음 요소에서 발생한 키 입력은 매핑을 실행하지 않습니다.

```text
input
textarea
select
contenteditable
```

## 반복 입력

키를 길게 눌렀을 때 발생하는 반복 `keydown` 이벤트는 기본적으로 실행됩니다. 반복 이벤트를 무시하려면 컨트롤러를 직접 생성할 때 `ignoreRepeat`을 지정합니다.

```js
window.keydownJS.controller.stop();

const controller = window.keydownJS.createKeydown({
  ignoreRepeat: true
}).start();
```

## 커스텀 액션

프로젝트에 필요한 액션을 등록할 수 있습니다.

```html
<section data-kd-sc="alt+p" data-kd-ac="paint">
  미리보기
</section>

<script src="https://cdn.jsdelivr.net/gh/k-i-m-m/keydown.js@v2.0.0/dist/keydown.v2.0.0.js"></script>
<script>
  document.addEventListener("DOMContentLoaded", () => {
    window.keydownJS.controller
      .registerAction("paint", ({ element }) => {
        element.style.backgroundColor = "gold";
      })
      .refresh();
  });
</script>
```

커스텀 액션의 실행 함수에는 다음 정보가 전달됩니다.

| 값 | 설명 |
| --- | --- |
| `element` | 액션이 연결된 HTML 요소 |
| `event` | 원본 `keydown` 이벤트 |
| `shortcut` | 정규화된 단축키 |
| `action` | `data-kd-ac`에 지정한 액션 이름 |
| `label` | `data-kd-sc`의 `--` 뒤에 작성한 선택적 라벨 |
| `controller` | 현재 실행 중인 컨트롤러 |

## 실행 이벤트

액션 실행 뒤 매핑된 요소에서 `keydownjs:trigger` 커스텀 이벤트가 발생합니다.

```js
const element = document.querySelector("[data-kd-sc='space']");

element.addEventListener("keydownjs:trigger", ({ detail }) => {
  console.log(detail.shortcut);
  console.log(detail.action);
});
```

## 동적으로 추가한 요소

라이브러리가 시작된 뒤 새로운 매핑 요소를 DOM에 추가하거나 기존 요소의 `data-kd-sc`, `data-kd-ac`을 변경했다면 `refresh()`를 호출해 매핑을 다시 수집합니다.

```js
window.keydownJS.controller.refresh();
```

## 전역 API

배포 스크립트는 `window.keydownJS`를 제공합니다.

| API | 설명 |
| --- | --- |
| `controller` | 자동으로 시작된 기본 컨트롤러 |
| `createKeydown(options)` | 새 컨트롤러 생성 |
| `start()` | 기본 컨트롤러 시작 또는 반환 |
| `normalizeKeyName(key)` | 키 이름과 별칭 정규화 |
| `normalizeShortcut(shortcut)` | 조합 키 정규화 |
| `codeToKey(code, fallbackKey)` | 키보드 코드 변환 |
| `eventToShortcut(event)` | 키보드 이벤트를 단축키 문자열로 변환 |
| `parseBinding(shortcut, action)` | 단축키와 액션 파싱 |
| `KeydownJS` | 컨트롤러 클래스 |

컨트롤러는 다음 메서드를 제공합니다.

| 메서드 | 설명 |
| --- | --- |
| `start()` | 매핑을 수집하고 이벤트 감지 시작 |
| `stop()` | 이벤트 감지 중지 |
| `refresh()` | 현재 DOM에서 매핑 다시 수집 |
| `registerAction(name, handler)` | 커스텀 액션 등록 |

## 배포 파일

```text
dist/keydown.v2.0.0.js
```

배포 파일은 일반 `<script>` 태그로 직접 불러올 수 있으며, 내부 구현 함수명은 배포를 위해 축약되어 있습니다.

## v2 변경 사항

`v2.0.0`부터 요소 `id`가 아닌 `data-kd-sc`와 `data-kd-ac`로 매핑합니다. 기존 `v1.x`의 `id="kd-*"` 문법은 더 이상 매핑되지 않습니다.

## 라이선스

이 프로젝트는 `PolyForm Noncommercial License 1.0.0` 조건으로 배포됩니다.

개인 프로젝트, 취미, 연구, 실험, 테스트 등 비상업적 목적으로 사용할 수 있습니다. 상업적 사용에는 별도의 서면 허가가 필요합니다.

상업적 이용 문의: `dev.kimms@gmail.com`

---

## English

`keydown-id` is a small browser library that reads `data-kd-sc` and `data-kd-ac` attributes and connects keyboard `keydown` events to element actions.

It lets you declare show, hide, toggle, and click behavior through HTML attributes without repeatedly writing event listeners.

The current release is `v2.0.0`.

## Getting Started

Add the distribution file to your HTML. The library automatically collects key mappings and starts after the document is ready.

```html
<script src="https://cdn.jsdelivr.net/gh/k-i-m-m/keydown.js@v2.0.0/dist/keydown.v2.0.0.js"></script>
```

Set the shortcut with `data-kd-sc` and the action with `data-kd-ac`. Existing element IDs remain unrestricted.

```html
<div id="menu" data-kd-sc="space" data-kd-ac="toggle">
  Open and close with Space
</div>

<div id="notice" data-kd-sc="esc" data-kd-ac="hide">
  Hide with Escape
</div>

<button id="save" data-kd-sc="control+shift+k" data-kd-ac="click">
  Control + Shift + K
</button>

<script src="https://cdn.jsdelivr.net/gh/k-i-m-m/keydown.js@v2.0.0/dist/keydown.v2.0.0.js"></script>
```

## Attribute Format

The basic attribute format is:

```text
data-kd-sc="<key or key combination>"
data-kd-ac="<action>"
```

Write a single key as `space`, `enter`, or `a`.

Join combination keys with `+`.

```html
<button data-kd-sc="control+s" data-kd-ac="click">Save</button>
<button data-kd-sc="meta+shift+p" data-kd-ac="click">Run command</button>
```

The same key may be mapped to multiple elements. You may append an optional label after `--`; the label does not affect the keyboard mapping.

```html
<div data-kd-sc="esc--notice" data-kd-ac="hide">Close notice</div>
<div data-kd-sc="esc--dialog" data-kd-ac="hide">Close dialog</div>
```

When multiple valid elements use the same key, all of their actions run.

## Built-in Actions

### `show`

Shows the element. The default display value is `block`.

```html
<div data-kd-sc="f1" data-kd-ac="show">Help</div>
```

### `hide`

Applies `display: none` to the element.

```html
<div data-kd-sc="esc" data-kd-ac="hide">Element to close</div>
```

### `toggle`

Switches the element between visible and hidden states.

```html
<nav data-kd-sc="control+m" data-kd-ac="toggle">Menu</nav>
```

### `click`

Calls `click()` on the element under the current mouse pointer when the key is pressed. If the pointer position cannot be resolved, it clicks the last pointer target or the mapped element.

```html
<button data-kd-sc="enter" data-kd-ac="click">Run</button>
```

## Display Values

Use `data-kd-display` when a `show` or `toggle` action needs a display value other than `block`.

```html
<div data-kd-sc="f2" data-kd-ac="toggle" data-kd-display="flex">
  Flex layout
</div>

<div data-kd-sc="f3" data-kd-ac="show" data-kd-display="grid">
  Grid layout
</div>
```

## Supported Keys

### Letters and Numbers

```text
a ... kd-z
0 ... kd-9
```

### Numpad

Numpad keys use the `num-` prefix.

```text
num-0 ... kd-num-9
num-enter
num-add
num-subtract
num-multiply
num-divide
num-decimal
```

### Function Keys

```text
f1 ... kd-f24
```

Some keyboards require holding `Fn` to use a Function key. The hardware helper key `Fn` itself is not mapped.

### Modifier Keys

```text
control
alt
shift
meta
```

Modifier keys in combinations are normalized internally in this order: `control`, `alt`, `shift`, `meta`.

### Common Keys

```text
escape
space
enter
backspace
tab
capslock
delete
insert
home
end
pageup
pagedown
arrowup
arrowdown
arrowleft
arrowright
contextmenu
printscreen
scrolllock
pause
numlock
```

### Punctuation Keys

```text
minus
equal
bracket-left
bracket-right
backslash
semicolon
quote
backquote
comma
period
slash
```

## Key Aliases

The following aliases are available for common operating-system and keyboard labels.

| Alias | Normalized Key |
| --- | --- |
| `cmd`, `command` | `meta` |
| `ctrl`, `ctl` | `control` |
| `option`, `opt` | `alt` |
| `esc` | `escape` |
| `return` | `enter` |
| `spacebar` | `space` |
| `del` | `delete` |
| `bksp` | `backspace` |
| `up`, `down`, `left`, `right` | Corresponding arrow key |

Use `meta` for the Windows key. Use `meta` or `cmd` for the macOS Command key, and `alt` or `option` for the macOS Option key.

## Browser Default Behavior

The library automatically adds `data-kd-prevent-default="true"` to mapped elements. When a valid action runs, the browser's default behavior for that key is prevented.

To keep browser defaults for individual mappings, create a controller manually and disable `autoPreventDefault`.

```js
window.keydownJS.controller.stop();

const controller = window.keydownJS.createKeydown({
  autoPreventDefault: false
}).start();
```

To prevent browser defaults for every executed mapping, use the `preventDefault` option.

```js
window.keydownJS.controller.stop();

const controller = window.keydownJS.createKeydown({
  preventDefault: true
}).start();
```

## Editable Elements

To avoid interrupting normal text input, mappings do not run when the keyboard event originates from:

```text
input
textarea
select
contenteditable
```

## Repeated Keydown Events

Repeated `keydown` events caused by holding a key run by default. Create a controller with `ignoreRepeat` to ignore them.

```js
window.keydownJS.controller.stop();

const controller = window.keydownJS.createKeydown({
  ignoreRepeat: true
}).start();
```

## Custom Actions

Register custom actions for project-specific behavior.

```html
<section data-kd-sc="alt+p" data-kd-ac="paint">
  Preview
</section>

<script src="https://cdn.jsdelivr.net/gh/k-i-m-m/keydown.js@v2.0.0/dist/keydown.v2.0.0.js"></script>
<script>
  document.addEventListener("DOMContentLoaded", () => {
    window.keydownJS.controller
      .registerAction("paint", ({ element }) => {
        element.style.backgroundColor = "gold";
      })
      .refresh();
  });
</script>
```

A custom action handler receives the following context:

| Value | Description |
| --- | --- |
| `element` | The HTML element connected to the action |
| `event` | The original `keydown` event |
| `shortcut` | The normalized shortcut |
| `action` | The action name from `data-kd-ac` |
| `label` | The optional label written after `--` in `data-kd-sc` |
| `controller` | The active controller |

## Trigger Event

After an action runs, the mapped element dispatches a `keydownjs:trigger` custom event.

```js
const element = document.querySelector("[data-kd-sc='space']");

element.addEventListener("keydownjs:trigger", ({ detail }) => {
  console.log(detail.shortcut);
  console.log(detail.action);
});
```

## Dynamically Added Elements

Call `refresh()` after adding a new mapped element or changing an existing element's `data-kd-sc` or `data-kd-ac`.

```js
window.keydownJS.controller.refresh();
```

## Global API

The distribution script exposes `window.keydownJS`.

| API | Description |
| --- | --- |
| `controller` | The automatically started default controller |
| `createKeydown(options)` | Creates a new controller |
| `start()` | Starts or returns the default controller |
| `normalizeKeyName(key)` | Normalizes a key name or alias |
| `normalizeShortcut(shortcut)` | Normalizes a key combination |
| `codeToKey(code, fallbackKey)` | Converts a keyboard code |
| `eventToShortcut(event)` | Converts a keyboard event into a shortcut string |
| `parseBinding(shortcut, action)` | Parses a shortcut and action |
| `KeydownJS` | The controller class |

Controllers provide the following methods:

| Method | Description |
| --- | --- |
| `start()` | Collects mappings and starts event handling |
| `stop()` | Stops event handling |
| `refresh()` | Collects mappings from the current DOM again |
| `registerAction(name, handler)` | Registers a custom action |

## Distribution File

```text
dist/keydown.v2.0.0.js
```

The distribution file can be loaded directly with a standard `<script>` tag. Internal implementation function names are shortened for distribution.

## Changes in v2

Starting with `v2.0.0`, mappings use `data-kd-sc` and `data-kd-ac` instead of element IDs. The previous `id="kd-*"` syntax from `v1.x` is no longer mapped.

## License

This project is distributed under the `PolyForm Noncommercial License 1.0.0`.

It may be used for noncommercial purposes such as personal projects, hobbies, research, experiments, and testing. Commercial use requires separate written permission.

Commercial-use contact: `dev.kimms@gmail.com`

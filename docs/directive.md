---
sidebar: auto
---

# v-tippy

Wow! This component is awesome.

## Example

## Source Code

<demo>
  <demo-Directive/>
</demo>

@[code](./demo/Directive.vue)

A basic string `<button v-tippy="'Some content'">Static</button>`: <button v-tippy="'Some content'">Static</button>



Custom HTML with `<tippy>`
<demo>
  <button v-tippy></button>
  <tippy>
    HTML: <i>{{tooltipText}}</i>
  </tippy>
</demo>

Multiple tooltips using `v-tippy`
<demo>
  <button v-tippy:a></button>
  <tippy target="a">
    First box
  </tippy>
  <button v-tippy:b></button>
  <tippy target="b" placement="right">
    Second box
  </tippy>
</demo>

Repeated targets using proximity
<demo>
  <button v-tippy></button>
  <tippy>First box</tippy>
  <button v-tippy></button>
  <tippy>Second box</tippy>
  <button v-tippy></button>
  <tippy>Third box</tippy>
</demo>

Leading proximity (tooltip should be on the second to last box)
<demo>
  <button v-tippy></button>
  <button v-tippy></button>
  <button v-tippy></button>
  <tippy>Proximity</tippy>
  <button v-tippy></button>
</demo>

Trailing proximity (tooltip should be on the first box)
<demo>
  <tippy>Proximity</tippy>
  <button v-tippy></button>
  <button v-tippy></button>
  <button v-tippy></button>
  <button v-tippy></button>
</demo>

Deep searching using `deep-search`
<demo>
  <!-- putting this first to verify initialization order -->
  <tippy target="box" deep-search>That's deep, bro</tippy>
  <div>
      <button v-tippy:box></button>
  </div>
</demo>

Tooltips on the parent using `target="_parent"`
<demo>
  <div class="parent-wrapper">
    <button></button>
    <tippy target="_parent">
      Parent
    </tippy>
  </div>
</demo>

List without tippy-singleton
<demo>
  <button @click="removeSingleton">-</button>
  <template v-for="i in singletons" style="padding: 0 3px;" :key="i">
    <button v-tippy></button>
    <tippy :extra="{delay: 500}">
      non-singleton {{i}}
    </tippy>
  </template>
  <button @click="addSingleton">+</button>
</demo>

Singletons with tippy-singleton
<demo>
  <tippy-singleton :props="{delay: 500}"></tippy-singleton>
  <button @click="removeSingleton">-</button>
  <div class="parent-wrapper"> <!-- pointless nesting just to show that it searches ancestors -->
    <template v-for="i in singletons" style="padding: 0 3px;" :key="i">
      <button v-tippy></button>
      <tippy singleton>
        Singleton {{i}}
      </tippy>
    </template>
  </div>
  <button @click="addSingleton">+</button>
</demo>

Multiple peer singletons
<demo>
  <tippy-singleton :props="{delay: 500}"></tippy-singleton>
  <template v-for="i in 4" style="padding: 0 3px;" :key="i">
    <button v-tippy></button>
    <tippy singleton>
      Singleton {{i}}
    </tippy>
  </template>
  <br>
  <span>Next set</span>
  <tippy-singleton :props="{delay: 500}"></tippy-singleton>
  <template v-for="i in 4" style="padding: 0 3px;" :key="i">
    <button v-tippy></button>
    <tippy singleton>
      Singleton {{i}}
    </tippy>
  </template>
</demo>

Nested singletons
<demo>
  <tippy-singleton :props="{delay: 500}"></tippy-singleton>
  <template v-for="i in 4" style="padding: 0 3px;" :key="i">
    <button v-tippy></button>
    <tippy singleton>
      Outer {{i}}
    </tippy>
  </template>
  <div class="parent-wrapper">
    <tippy-singleton :props="{delay: 500}"></tippy-singleton>
    <template v-for="i in 2" style="padding: 0 3px;" :key="i">
      <button v-tippy></button>
      <tippy singleton>
        Inner {{i}}
      </tippy>
    </template>
  </div>
  <template v-for="i in 4" style="padding: 0 3px;" :key="i">
    <button v-tippy></button>
    <tippy singleton>
      Outer {{i+4}}
    </tippy>
  </template>
</demo>

Named singletons
<demo>
  <tippy-singleton name="even" :props="{delay: 500}"></tippy-singleton>
  <tippy-singleton name="odd" :props="{delay: 500}"></tippy-singleton>
  <template v-for="i in 11" style="padding: 0 3px;" :key="i">
    <button v-tippy></button>
    <tippy :singleton="i % 2 === 0 ? 'even' : 'odd'">
      {{i % 2 === 0 ? 'Even' : 'Odd'}} {{i}}
    </tippy>
  </template>
</demo>

Interactive tooltips sometimes require `on-body` to get around z-index, clipping, or styling issues (when the element is
interactive and doesn't have `on-body`, it'll be placed next to its target, which means it'll inherit the styles of that
element. Note the style of the
`on-body` element in the interactive tooltips)
<demo>
  <button v-tippy:non-interactive></button>
  <tippy target="non-interactive">I'm not interactive</tippy>
  <button v-tippy:interactive></button>
  <tippy target="interactive" interactive>I'm interactive,<br/>but not <code>on-body</code></tippy>
  <button v-tippy:interactive-on-body></button>
  <tippy target="interactive-on-body" interactive on-body>I'm interactive,<br/>and <code>on-body</code></tippy>
</demo>

## slots

...

## props

...

<script setup>
import {computed, ref, onMounted, onUnmounted} from 'vue';

const seconds = ref(0);
const tooltipText = computed(() => "Seconds: " + seconds.value);
const singletons = ref([1, 2, 3]);

let intervalHandle = -1;
onMounted(() => {
  intervalHandle = setInterval(() => seconds.value++, 1000)
});
onUnmounted(() => {
  clearInterval(intervalHandle)
});

let nextSingleton = 4;
function addSingleton() {
  singletons.value.push(nextSingleton++);
}
function removeSingleton() {
  singletons.value.splice(0, 1);
}
</script>
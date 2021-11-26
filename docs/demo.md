---
sidebar: auto
---

# Demo

Wow! This component is awesome.

## Example

## Source Code

A simple tooltip using `v-tippy`:
<section>
  <div class="box" v-tippy="'Some content'"></div>
</section>

This triggers on clicking:
<section>
  <div class="box" v-tippy="{content: 'Some content', trigger:'click', interactive:true}"></div>
</section>

The computed value changes every second:
<section>
  <div class="box" v-tippy="{content: tooltipText}"></div>
</section>

Custom HTML with `<tippy>`
<section>
  <div class="box" v-tippy></div>
  <tippy>
    HTML: <i>{{tooltipText}}</i>
  </tippy>
</section>

Multiple tooltips using `v-tippy`
<section>
  <div class="box" v-tippy:a></div>
  <tippy target="a">
    First box
  </tippy>
  <div class="box" v-tippy:b></div>
  <tippy target="b" placement="right">
    Second box
  </tippy>
</section>

Repeated targets using proximity
<section>
  <div class="box" v-tippy></div>
  <tippy>First box</tippy>
  <div class="box" v-tippy></div>
  <tippy>Second box</tippy>
  <div class="box" v-tippy></div>
  <tippy>Third box</tippy>
</section>

Leading proximity (tooltip should be on the second to last box)
<section>
  <div class="box" v-tippy></div>
  <div class="box" v-tippy></div>
  <div class="box" v-tippy></div>
  <tippy>Proximity</tippy>
  <div class="box" v-tippy></div>
</section>

Trailing proximity (tooltip should be on the first box)
<section>
  <tippy>Proximity</tippy>
  <div class="box" v-tippy></div>
  <div class="box" v-tippy></div>
  <div class="box" v-tippy></div>
  <div class="box" v-tippy></div>
</section>

Deep searching using `deep-search`
<section>
  <!-- putting this first to verify initialization order -->
  <tippy target="box" deep-search>That's deep, bro</tippy>
  <div>
      <div class="box" v-tippy:box></div>
  </div>
</section>

Tooltips on the parent using `target="_parent"`
<section>
  <div class="parent-wrapper">
    <div class="box"></div>
    <tippy target="_parent">
      Parent
    </tippy>
  </div>
</section>

List without tippy-singleton
<section>
  <div class="box" @click="removeSingleton">-</div>
  <template v-for="i in singletons" style="padding: 0 3px;" :key="i">
    <div class="box" v-tippy></div>
    <tippy :extra="{delay: 500}">
      non-singleton {{i}}
    </tippy>
  </template>
  <div class="box" @click="addSingleton">+</div>
</section>

Singletons with tippy-singleton
<section>
  <tippy-singleton :props="{delay: 500}"></tippy-singleton>
  <div class="box" @click="removeSingleton">-</div>
  <div class="parent-wrapper"> <!-- pointless nesting just to show that it searches ancestors -->
    <template v-for="i in singletons" style="padding: 0 3px;" :key="i">
      <div class="box" v-tippy></div>
      <tippy singleton>
        Singleton {{i}}
      </tippy>
    </template>
  </div>
  <div class="box" @click="addSingleton">+</div>
</section>

Multiple peer singletons
<section>
  <tippy-singleton :props="{delay: 500}"></tippy-singleton>
  <template v-for="i in 4" style="padding: 0 3px;" :key="i">
    <div class="box" v-tippy></div>
    <tippy singleton>
      Singleton {{i}}
    </tippy>
  </template>
  <br>
  <span>Next set</span>
  <tippy-singleton :props="{delay: 500}"></tippy-singleton>
  <template v-for="i in 4" style="padding: 0 3px;" :key="i">
    <div class="box" v-tippy></div>
    <tippy singleton>
      Singleton {{i}}
    </tippy>
  </template>
</section>

Nested singletons
<section>
  <tippy-singleton :props="{delay: 500}"></tippy-singleton>
  <template v-for="i in 4" style="padding: 0 3px;" :key="i">
    <div class="box" v-tippy></div>
    <tippy singleton>
      Outer {{i}}
    </tippy>
  </template>
  <div class="parent-wrapper">
    <tippy-singleton :props="{delay: 500}"></tippy-singleton>
    <template v-for="i in 2" style="padding: 0 3px;" :key="i">
      <div class="box" v-tippy></div>
      <tippy singleton>
        Inner {{i}}
      </tippy>
    </template>
  </div>
  <template v-for="i in 4" style="padding: 0 3px;" :key="i">
    <div class="box" v-tippy></div>
    <tippy singleton>
      Outer {{i+4}}
    </tippy>
  </template>
</section>

Named singletons
<section>
  <tippy-singleton name="even" :props="{delay: 500}"></tippy-singleton>
  <tippy-singleton name="odd" :props="{delay: 500}"></tippy-singleton>
  <template v-for="i in 11" style="padding: 0 3px;" :key="i">
    <div class="box" v-tippy></div>
    <tippy :singleton="i % 2 === 0 ? 'even' : 'odd'">
      {{i % 2 === 0 ? 'Even' : 'Odd'}} {{i}}
    </tippy>
  </template>
</section>

Interactive tooltips sometimes require `on-body` to get around z-index, clipping, or styling issues (when the element is
interactive and doesn't have `on-body`, it'll be placed next to its target, which means it'll inherit the styles of that
element. Note the style of the
`on-body` element in the interactive tooltips)
<section>
  <div class="box" v-tippy:non-interactive></div>
  <tippy target="non-interactive">I'm not interactive</tippy>
  <div class="box" v-tippy:interactive></div>
  <tippy target="interactive" interactive>I'm interactive,<br/>but not <code>on-body</code></tippy>
  <div class="box" v-tippy:interactive-on-body></div>
  <tippy target="interactive-on-body" interactive on-body>I'm interactive,<br/>and <code>on-body</code></tippy>
</section>

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
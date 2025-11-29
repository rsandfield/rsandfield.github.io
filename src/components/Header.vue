<script>
// import { RouterLink } from 'vue-router';
</script>

<template>
    <header>
        <div class = "header">
            <h1>
                Robert Sandfield
            </h1>
        </div>
        <div>
            <nav>
                <ul  class="navlist">
                    <li class="navitem"><RouterLink to="/portfolio" class="navlink">Portfolio</RouterLink></li>
                    <li class="navitem"><RouterLink to="/about" class="navlink">About</RouterLink></li>
                    <li class="navitem"><RouterLink to="/contact" class="navlink">Contact</RouterLink></li>
                </ul>
            </nav>
        </div>
    </header>
</template>


<style scoped>
header {
    width: 100vw;
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

.header {
    background: var(--color-primary);
}
.header h1 {
    padding-top: 50px;
    padding-left: 50px;
    color: var(--color-background);
    font-size: xxx-large;
}

nav {
    background: var(--color-secondary);
}

.navlist {
    list-style-type: none;
    display: inline-block;
    margin: 0;
    padding-left: 50px;
    margin-block-start: 1em;
    margin-block-end: 1em;
    unicode-bidi: isolate;
}

.navitem {
    display: block;
    text-align: center;
    height: 50px;
    width: 140px;
    position: relative;
    float: left;
}

.navitem:hover {
    background-color: var(--color-secondary-variant);
}

.navlink {
    color: var(--color-background);
    font-size: xx-large;
}

.navlink:hover {
    background-color: var(--color-secondary-variant);
    color: var(--color-text);
}
</style>
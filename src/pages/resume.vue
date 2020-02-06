<template>
    <div>
        <div class="photoWall">
            <div class="photo1">
                <img src="@/assets/images/resume/resume1.jpg" alt="">
            </div>
            <div class="photo2">
                <img src="@/assets/images/resume/resume3.jpg" alt="">
            </div>
        </div>
    </div>
</template>

<script>
export default {
    
}
</script>

<style scoped>
.photoWall {
    position: absolute;
    width: 100%;
    height: 50rem;
    background: #888
}
.photo1 {
    width: 21rem;
    height: 21rem;
    border: 1px solid #ccc;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    padding: 0.5rem;
}
.photo2 {
    width: 20rem;
    height: 9rem;
    border: 1px solid #ccc;
    position: absolute;
}
img {
    width: 100%;
    height: 100%;
    object-fit: cover;
}
</style>
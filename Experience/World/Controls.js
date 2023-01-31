import Experience from '../Experience';
import * as THREE from 'three'
import GSAP from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export default class Controls {
    constructor() {
        this.experience = new Experience();
        this.scene = this.experience.scene
        this.resources = this.experience.resources;
        this.time = this.experience.time;
        this.camera = this.experience.camera
        this.room = this.experience.world.room.actualRoom;
        this.room.children.forEach(child => {
            if (child.type === "RectAreaLight") {
                this.rectLight = child;
            }
        })
        this.sizes = this.experience.sizes;
        GSAP.registerPlugin(ScrollTrigger);

        this.setScrollTrigger();
    }

    setScrollTrigger() {
        ScrollTrigger.matchMedia({
            //Desktop
            "(min-width: 969px)": () => {

                this.room.scale.set(0.11, 0.11, 0.11);
                this.rectLight.width = 0.5;
                this.rectLight.height = 0.7;

                // First Section
                this.firstMoveTimeline = new GSAP.timeline({
                    scrollTrigger: {
                        trigger: ".first-move",
                        start: "top top",
                        end: "bottom bottom",
                        scrub: 0.6,
                        invalidateOnRefresh: true
                    }
                });
                this.firstMoveTimeline.to(this.room.position, {
                    x: () => this.sizes.width * 0.0014
                })

                // Second Section
                this.secondMoveTimeline = new GSAP.timeline({
                    scrollTrigger: {
                        trigger: ".second-move",
                        start: "top top",
                        end: "bottom bottom",
                        scrub: 0.6,
                        invalidateOnRefresh: true
                    }
                });
                this.secondMoveTimeline.to(this.room.position, {
                    x: () => 1,
                    z: () => this.sizes.height * 0.0032
                }, "same")
                this.secondMoveTimeline.to(this.room.scale, {
                    x: 0.4,
                    y: 0.4,
                    z: 0.4
                }, "same")
                this.secondMoveTimeline.to(this.rectLight, {
                    width: 0.5 * 4,
                    height: 0.7 * 4
                }, "same")

                // Third Section
                this.thirdMoveTimeline = new GSAP.timeline({
                    scrollTrigger: {
                        trigger: ".third-move",
                        start: "top top",
                        end: "bottom bottom",
                        scrub: 0.6,
                        invalidateOnRefresh: true
                    }
                })
                this.thirdMoveTimeline.to(this.camera.orthographicCamera.position, {
                    y: -0.5,
                    x: -2
                })
            },

            //Mobile
            "(max-width: 968px)": () => {
                //Resets
                this.room.scale.set(0.07, 0.07, 0.07);
                this.rectLight.width = 0.3;
                this.rectLight.height = 0.4;
                this.room.position.set(0, 0, 0)
                // First Section
                this.firstMoveTimeline = new GSAP.timeline({
                    scrollTrigger: {
                        trigger: ".first-move",
                        start: "top top",
                        end: "bottom bottom",
                        scrub: 0.6,
                        invalidateOnRefresh: true
                    }
                })
                    .to(this.room.scale, {
                        x: 0.1,
                        y: 0.1,
                        z: 0.1
                    })
                // Second Section
                this.secondMoveTimeline = new GSAP.timeline({
                    scrollTrigger: {
                        trigger: ".second-move",
                        start: "top top",
                        end: "bottom bottom",
                        scrub: 0.6,
                        invalidateOnRefresh: true
                    }
                }, "same")
                    .to(this.room.scale, {
                        x: 0.25,
                        y: 0.25,
                        z: 0.25
                    }, "same")
                    .to(this.rectLight, {
                        width: 0.3 * 3.4,
                        height: 0.4 * 3.4
                    }, "same")
                    .to(this.room.position, {
                        x: 1.5
                    }, "same")
                // Third Section
                this.thirdMoveTimeline = new GSAP.timeline({
                    scrollTrigger: {
                        trigger: ".third-move",
                        start: "top top",
                        end: "bottom bottom",
                        scrub: 0.6,
                        invalidateOnRefresh: true
                    }
                })
            }
        })
    }

    resize() {

    }

    update() {

    }
}
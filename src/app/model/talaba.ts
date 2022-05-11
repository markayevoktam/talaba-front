import { Guruh } from "./guruh"
import { Loyiha } from "./loyiha"
import { OquvShakl } from "./oquvShakl"
import { Xarakter } from "./xarakter"

export interface Talaba{
    id:number
    ism:string
    familya:string
    sharif:string
    yosh: number
    hudud:string
    loyiha:Loyiha
    guruh:Guruh
    xarakter:Xarakter
    info:string
    oquvShakl:OquvShakl;
    rasm:any;
}
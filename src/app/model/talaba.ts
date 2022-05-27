import { Guruh } from "./guruh"
import { Loyiha } from "./loyiha"
import { OquvShakl } from "./oquvShakl"
import { Xarakter } from "./xarakter"
import { Yutuq } from "./yutuq"

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
    ball:number
    rasm:any
    yutuq:Yutuq
}
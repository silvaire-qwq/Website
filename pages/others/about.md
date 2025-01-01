---
layout: home
footer: false
---

<style>
    div.AboutTable {
        column-gap: 10px;
        column-width: 300px;
        column-count: auto;
        div.oneOfAbout {
            break-inside: avoid !important;
            border: 1px solid var(--vp-c-divider);
            border-radius: .9rem;
            margin-bottom: 10px;
            padding: 35px 25px;
            p {
                color: var(--vp-c-text-3);
                opacity: .9;
                margin: 0px;
            }
            h1 {
                margin: 10px 0px;
                font-size: 35px;
                transition: all .4s;
            }
            transition: all .4s;
        }
        div.oneOfAbout:hover:not(.main) {
            border-color: var(--vp-c-brand-1);
            background-color: var(--vp-c-bg-soft);
            h1 {
                color: var(--vp-c-brand-1)
            }
            box-shadow: 0 8px 16px -4px var(--vp-c-bg-soft);
        }
        div.oneOfAbout.main:hover {
            box-shadow: 0 8px 16px -4px var(--vp-c-brand-soft);
            border: 1px solid var(--vp-c-brand-2);
        }
        div.oneOfAbout.main {
            background-color: var(--vp-c-brand-soft);
            border: 1px solid var(--vp-c-brand-1);
        }
    }
</style>

<div class="AboutTable">
    <div class="oneOfAbout main">
        <p>你好，很高兴认识你 👋</p>
        <h1>我是 <strong>silvaire-qwq</strong></h1>
        <p>是一名学生。</p>
    </div>
    <div class="oneOfAbout">
        <p>我的 MBTI</p>
        <h1>ESFP</h1>
        <p>E代表外向，S代表感知，F代表感觉，P代表感知。</p>
    </div>
    <div class="oneOfAbout">
        <p>年龄</p>
        <h1>10 后</h1>
        <p>风云际会，21世纪的头10年已经过去，当时间进入到2010年1月1日0时0分，“10后”正式登场。</p>
    </div>
    <div class="oneOfAbout">
        <p>居住地</p>
        <h1>天津市</h1>
        <p>天津是中国四大直辖市之一，也是中国北方最大的开放城市和工商业城市。天津简称“津”，意为天子经过的渡口，也称“津沽”、“津门”。天津地处中国华北地区，华北平原东北部，海河流域下游，东临渤海，北依燕山，西靠首都北京。</p>
    </div>
    <div class="oneOfAbout">
        <p>操作系统</p>
        <h1>Arch Linux Rolling</h1>
        <p>Arch Linux 是一款基于 x86-64 架构的 Linux 发行版。系统主要由自由和开源软件组成，支持社区参与。系统设计以 KISS 原则（保持简单和愚蠢）为总体指导原则，注重代码正确、优雅和极简主义，期待用户能够愿意去理解系统的操作。</p>
    </div>
    <div class="oneOfAbout">
        <p>爱好</p>
        <h1>编程</h1>
        <p>编程是编写程序代码的中文简称，就是让计算机代码解决某个问题，对某个计算体系规定一定的运算方式，使计算体系按照该计算方式运行，并最终得到相应结果的过程。</p>
    </div>
    <div class="oneOfAbout">
        <p>乐器</p>
        <h1>古琴</h1>
        <p>古琴，又称瑶琴、玉琴、七弦琴，是中国传统拨弦乐器，有三千年以上历史，属于八音中的丝。古琴音域宽广，音色深沉，余音悠远。</p>
    </div>
    <div class="oneOfAbout">
        <p>最喜欢的编程语言</p>
        <h1>Shell</h1>
        <p>Shell 是一个用 C 语言编写的程序，它是用户使用 Linux 的桥梁。Shell 既是一种命令语言，又是一种程序设计语言。Shell 是指一种应用程序，这个应用程序提供了一个界面，用户通过这个界面访问操作系统内核的服务。</p>
    </div>
</div>
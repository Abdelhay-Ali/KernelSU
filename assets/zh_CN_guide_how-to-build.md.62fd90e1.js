import{_ as s,c as a,o as e,a as n}from"./app.45ef8e19.js";const y=JSON.parse('{"title":"如何构建 KernelSU?","description":"","frontmatter":{},"headers":[{"level":2,"title":"构建内核","slug":"构建内核","link":"#构建内核","children":[{"level":3,"title":"同步内核源码","slug":"同步内核源码","link":"#同步内核源码","children":[]},{"level":3,"title":"构建","slug":"构建","link":"#构建","children":[]}]},{"level":2,"title":"使用 KernelSU 构建内核","slug":"使用-kernelsu-构建内核","link":"#使用-kernelsu-构建内核","children":[]}],"relativePath":"zh_CN/guide/how-to-build.md"}'),l={name:"zh_CN/guide/how-to-build.md"},o=n(`<h1 id="如何构建-kernelsu" tabindex="-1">如何构建 KernelSU? <a class="header-anchor" href="#如何构建-kernelsu" aria-hidden="true">#</a></h1><p>首先，您应该阅读内核构建的 Android 官方文档：</p><ol><li><a href="https://source.android.com/docs/setup/build/building-kernels" target="_blank" rel="noreferrer">构建内核</a></li><li><a href="https://source.android.com/docs/core/architecture/kernel/gki-release-builds" target="_blank" rel="noreferrer">通用内核映像 (GKI) 发布构建</a></li></ol><div class="warning custom-block"><p class="custom-block-title">WARNING</p><p>本文档适用于 GKI 设备，如果你是旧内核，请参考<a href="./how-to-integrate-for-non-gki.html">如何为非GKI设备集成 KernelSU</a></p></div><h2 id="构建内核" tabindex="-1">构建内核 <a class="header-anchor" href="#构建内核" aria-hidden="true">#</a></h2><h3 id="同步内核源码" tabindex="-1">同步内核源码 <a class="header-anchor" href="#同步内核源码" aria-hidden="true">#</a></h3><div class="language-sh"><button title="Copy Code" class="copy"></button><span class="lang">sh</span><pre class="shiki material-palenight"><code><span class="line"><span style="color:#FFCB6B;">repo</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">init</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">-u</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">https://android.googlesource.com/kernel/manifest</span></span>
<span class="line"><span style="color:#FFCB6B;">mv</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&lt;</span><span style="color:#C3E88D;">kernel_manifest.xm</span><span style="color:#A6ACCD;">l</span><span style="color:#89DDFF;">&gt;</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">.repo/manifests</span></span>
<span class="line"><span style="color:#FFCB6B;">repo</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">init</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">-m</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">manifest.xml</span></span>
<span class="line"><span style="color:#FFCB6B;">repo</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">sync</span></span>
<span class="line"></span></code></pre></div><p><code>&lt;kernel_manifest.xml&gt;</code> 是一个可以唯一确定构建的清单文件，您可以使用该清单进行可重新预测的构建。 您应该从 <a href="https://source.android.com/docs/core/architecture/kernel/gki-release-builds" target="_blank" rel="noreferrer">通用内核映像 (GKI) 发布构建</a> 下载清单文件</p><h3 id="构建" tabindex="-1">构建 <a class="header-anchor" href="#构建" aria-hidden="true">#</a></h3><p>请先查看 <a href="https://source.android.com/docs/setup/build/building-kernels" target="_blank" rel="noreferrer">官方文档</a>。</p><p>例如，我们需要构建 aarch64 内核镜像：</p><div class="language-sh"><button title="Copy Code" class="copy"></button><span class="lang">sh</span><pre class="shiki material-palenight"><code><span class="line"><span style="color:#A6ACCD;">LTO</span><span style="color:#89DDFF;">=</span><span style="color:#C3E88D;">thin</span><span style="color:#A6ACCD;"> BUILD_CONFIG</span><span style="color:#89DDFF;">=</span><span style="color:#C3E88D;">common/build.config.gki.aarch64</span><span style="color:#A6ACCD;"> build/build.sh</span></span>
<span class="line"></span></code></pre></div><p>不要忘记添加 <code>LTO=thin</code>, 否则，如果您的计算机内存小于 24GB，构建可能会失败.</p><p>从 Android 13 开始，内核由 <code>bazel</code> 构建:</p><div class="language-sh"><button title="Copy Code" class="copy"></button><span class="lang">sh</span><pre class="shiki material-palenight"><code><span class="line"><span style="color:#FFCB6B;">tools/bazel</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">build</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">--config=fast</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">//common:kernel_aarch64_dist</span></span>
<span class="line"></span></code></pre></div><h2 id="使用-kernelsu-构建内核" tabindex="-1">使用 KernelSU 构建内核 <a class="header-anchor" href="#使用-kernelsu-构建内核" aria-hidden="true">#</a></h2><p>如果您可以成功构建内核，那么构建 KernelSU 就很容易，在内核源代码根目录中运行此命令：</p><div class="language-sh"><button title="Copy Code" class="copy"></button><span class="lang">sh</span><pre class="shiki material-palenight"><code><span class="line"><span style="color:#FFCB6B;">curl</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">-LSs</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">https://raw.githubusercontent.com/tiann/KernelSU/main/kernel/setup.sh</span><span style="color:#89DDFF;">&quot;</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">|</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">bash</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">-</span></span>
<span class="line"></span></code></pre></div><p>然后重建内核，您将获得带有 KernelSU 的内核映像！</p>`,19),p=[o];function r(t,c,i,d,h,C){return e(),a("div",null,p)}const D=s(l,[["render",r]]);export{y as __pageData,D as default};
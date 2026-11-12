(function () {
  var d = window.PORTFOLIO;
  var $ = function (id) { return document.getElementById(id); };

  function el(tag, cls, text) {
    var n = document.createElement(tag);
    if (cls) n.className = cls;
    if (text != null) n.textContent = text;
    return n;
  }

  document.title = d.nome + " | Portfólio";
  $("nome").textContent = d.nome;
  ["cargo", "resumo", "local"].forEach(function (k) {
    $(k).textContent = d[k];
    $(k).hidden = !d[k];
  });
  $("ano").textContent = new Date().getFullYear();
  $("rodape-nome").textContent = d.nome;

  d.projetos.forEach(function (p) {
    var card = el(p.url ? "a" : "article", "card");
    if (p.url) { card.href = p.url; card.target = "_blank"; card.rel = "noopener"; }
    var thumb = el("div", "thumb");
    if (p.imagem) {
      var img = el("img");
      img.src = p.imagem; img.alt = p.titulo; img.loading = "lazy";
      thumb.appendChild(img);
    }
    card.appendChild(thumb);
    card.appendChild(el("p", "meta", [p.categoria, p.ano].filter(Boolean).join(" · ")));
    card.appendChild(el("h3", null, p.titulo));
    card.appendChild(el("p", null, p.descricao));
    $("lista-projetos").appendChild(card);
  });

  d.experiencias.forEach(function (x) {
    var item = el("div", "item");
    item.appendChild(el("p", "meta", x.periodo));
    item.appendChild(el("h3", null, x.cargo + " · " + x.empresa));
    var ul = el("ul");
    x.itens.forEach(function (t) { ul.appendChild(el("li", null, t)); });
    item.appendChild(ul);
    $("lista-experiencias").appendChild(item);
  });

  d.formacao.forEach(function (f) {
    var item = el("div", "item");
    item.appendChild(el("p", "meta", f.periodo));
    item.appendChild(el("h3", null, f.curso));
    item.appendChild(el("p", null, f.instituicao));
    $("lista-formacao").appendChild(item);
  });

  d.habilidades.forEach(function (h) {
    var item = el("div", "item");
    item.appendChild(el("h3", null, h.grupo));
    var tags = el("div", "tags");
    h.itens.forEach(function (t) { tags.appendChild(el("span", "tag", t)); });
    item.appendChild(tags);
    $("lista-habilidades").appendChild(item);
  });

  d.idiomas.forEach(function (i) {
    $("lista-idiomas").appendChild(el("li", null, i.idioma + " (" + i.nivel + ")"));
  });

  d.contatos.forEach(function (c) {
    var li = el("li");
    li.appendChild(el("span", "meta", c.rotulo));
    var v = el(c.url ? "a" : "span", null, c.texto);
    if (c.url) { v.href = c.url; v.target = "_blank"; v.rel = "noopener"; }
    li.appendChild(v);
    $("lista-contatos").appendChild(li);
  });

  ["projetos", "experiencias", "formacao", "habilidades", "idiomas", "contatos"].forEach(function (k) {
    var alvo = $("lista-" + k);
    if (!alvo.children.length) alvo.appendChild(el(alvo.tagName === "UL" ? "li" : "p", "meta", "Em breve."));
  });

  $("imprimir").addEventListener("click", function () { window.print(); });
})();

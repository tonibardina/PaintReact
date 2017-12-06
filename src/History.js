var history = {
  redo_list: [],
  undo_list: [],
  saveState: function(canvas, list, keepRedo) {
    keepRedo = keepRedo || false
    if (!keepRedo) {
      this.redo_list = []
    }
    (list || this.undo_list).push(canvas.toDataURL())
  },
  undo: function (canvas, ctx) {
    this.restoreState(canvas, ctx, this.undo_list, this.redo_list)
  },
  redo: function (canvas, ctx) {
    this.restoreState(canvas, ctx, this.redo_list, this.undo_list)
  },
  restoreState: function (canvas, ctx, pop, push) {
    if (pop.length) {
      this.saveState(canvas, push, true)
      var restoreState = pop.pop()
      var img = new Element('img', {'src': restoreState})
      img.onload = function () {
        ctx.clearRect(0, 0, 600, 400)
        ctx.drawImage(img, 0, 0, 600, 400, 0, 0, 600, 400)
      }
    }
  }
}
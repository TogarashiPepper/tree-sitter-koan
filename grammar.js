module.exports = grammar({
  name: 'koan',
  word: $ => $.identifier,

  rules: {
    // TODO: add the actual grammar rules
    source_file: $ => repeat($._definition),
    _definition: $ => choice($.let_definition, $._expr),
    let_definition: $ => seq('let', $.identifier, '=', $._expr, ';'),
    _expr: $ => choice(
      $.identifier,
      $.unary_expr,
      $.binary_expr,
      $.number,
      $.string,
      $.array_lit
      // $.fn_call,
    ),

    unary_expr: $ => prec(7, choice(
      seq('-', $._expr),
      seq('!', $._expr),
      seq('√', $._expr),
      seq('○', $._expr),
    )),

    binary_expr: $ => choice(
      prec.left(6, seq($._expr, '^', $._expr)),
      prec.left(5, seq($._expr, '*', $._expr)),
      prec.left(5, seq($._expr, '/', $._expr)),
      prec.left(4, seq($._expr, '+', $._expr)),
      prec.left(4, seq($._expr, '-', $._expr)),
      prec.left(3, seq($._expr, '==', $._expr)),
      prec.left(3, seq($._expr, '!=', $._expr)),
      prec.left(2, seq($._expr, '>=', $._expr)),
      prec.left(2, seq($._expr, '>', $._expr)),
      prec.left(2, seq($._expr, '<=', $._expr)),
      prec.left(2, seq($._expr, '<', $._expr)),
      prec.left(1, seq($._expr, '||', $._expr)),
      prec.left(1, seq($._expr, '&&', $._expr)),
    ),

    identifier: $ => /([a-zA-Z_][a-zA-Z0-9_]*|π)/,
    number: $ => /\d+(.\d+)?/,
    string: $ => /".*"/,
    array_lit: $ => seq(
      '[',
      optional(seq(
        $._expr,
        repeat(seq(',', $._expr)),
        optional(','))
      ),
      ']'
    )
  }
});


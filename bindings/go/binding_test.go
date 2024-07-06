package tree_sitter_koan_test

import (
	"testing"

	tree_sitter "github.com/smacker/go-tree-sitter"
	"github.com/tree-sitter/tree-sitter-koan"
)

func TestCanLoadGrammar(t *testing.T) {
	language := tree_sitter.NewLanguage(tree_sitter_koan.Language())
	if language == nil {
		t.Errorf("Error loading Koan grammar")
	}
}

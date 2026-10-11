"use strict";
// // Base AST node
// interface BaseNode {
// 	type: string;
// 	start: number;
// 	end: number;
// }
// interface ProgramNode extends BaseNode {
// 	type: "Program";
// 	body: StatementNode[];
// 	sourceType: "module" | "script";
// 	callee: {}
// }
// interface ExpressionStatementNode extends BaseNode {
// 	type: "ExpressionStatement";
// 	expression: ExpressionNode;
// 	key: {}
// 	callee: {}
// }
// interface VariableDeclarationNode extends BaseNode {
// 	type: "VariableDeclaration";
// 	declarations: VariableDeclarator[];
// 	kind: "var" | "let" | "const";
// 	callee: {}
// 	key: {}
// }
// interface FunctionDeclarationNode extends BaseNode {
// 	type: "FunctionDeclaration";
// 	id: IdentifierNode | null;
// 	params: PatternNode[];
// 	body: BlockStatementNode;
// }
// interface IdentifierNode extends BaseNode {
// 	type: "Identifier";
// 	name: string;
// }
// interface CallExpressionNode extends BaseNode {
// 	type: "CallExpression";
// 	callee: ExpressionNode;
// 	arguments: ExpressionNode[];
// 	optional: boolean;
// 	key: {
// 	}
// }
// interface AssignmentExpressionNode extends BaseNode {
// 	type: "AssignmentExpression";
// 	operator: string;
// 	left: PatternNode;
// 	right: ExpressionNode;
// }
// interface ArrowFunctionExpressionNode extends BaseNode {
// 	type: "ArrowFunctionExpression";
// 	params: PatternNode[];
// 	body: BlockStatementNode | ExpressionNode;
// 	async: boolean;
// }
// interface FunctionExpressionNode extends BaseNode {
// 	type: "FunctionExpression";
// 	id: IdentifierNode | null;
// 	params: PatternNode[];
// 	body: BlockStatementNode;
// }
// interface ClassDeclarationNode extends BaseNode {
// 	type: "ClassDeclaration";
// 	id: IdentifierNode | null;
// 	body: ClassBodyNode;
// }
// interface ClassBodyNode extends BaseNode {
// 	type: "ClassBody";
// 	body: MethodDefinitionNode[];
// }
// interface MethodDefinitionNode extends BaseNode {
// 	type: "MethodDefinition";
// 	key: IdentifierNode;
// 	value: FunctionExpressionNode | ArrowFunctionExpressionNode;
// 	kind: "constructor" | "method" | "get" | "set";
// }
// // Identifier node
// interface IdentifierNode extends BaseNode {
// 	type: "Identifier";
// 	name: string;
// 	key: {
// 		name: string
// 	}
// }
// // ExpressionStatement node
// // interface ExpressionStatementNode extends BaseNode {
// // 	type: "ExpressionStatement";
// // 	expression: CallExpressionNode;
// // }
// // Program node (root)
// // interface ProgramNode extends BaseNode {
// // 	type: "Program";
// // 	body: ExpressionStatementNode[];
// // 	sourceType: "module" | "script";
// // }
// // interface VariableDeclarator extends BaseNode {
// // 	type: "VariableDeclarator";
// // 	id: IdentifierNode;
// // 	init?: ExpressionNode | null;
// // }
// interface BlockStatementNode extends BaseNode {
// 	type: "BlockStatement";
// 	body: StatementNode[];
// }
// type StatementNode =
// 	| ExpressionStatementNode
// 	| VariableDeclarationNode
// 	| FunctionDeclarationNode
// 	| ClassDeclarationNode
// 	| BlockStatementNode;
// type ExpressionNode =
// 	| IdentifierNode
// 	| CallExpressionNode
// 	| AssignmentExpressionNode
// 	| ArrowFunctionExpressionNode
// 	| FunctionExpressionNode;
// type PatternNode = IdentifierNode; // can be extended for destructuring
// // Union type for all nodes
// type ASTNode =
// 	| ProgramNode
// 	| StatementNode
// 	| ExpressionNode
// 	| VariableDeclarator
// 	| ClassBodyNode
// 	| MethodDefinitionNode;

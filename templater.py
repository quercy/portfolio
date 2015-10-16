import jinja2

class Templater:
	def __init__(self):
		templateLoader = jinja2.FileSystemLoader( searchpath="./partials" )
		self.templateEnv = jinja2.Environment( loader=templateLoader )
		self.template = self.templateEnv.get_template( "_template.html" )
		self.content = ''

	def render(self, data):
		print self.template.render(dict(data, **{"content" : self.content}))

	def setContentPartial(self, filename):
		self.content = self.renderPartial(filename)
		return self

	def renderPartial(self, filename):
		return self.templateEnv.get_template( filename ).render()

	def setContent(self, text):
		self.content = text
		return self
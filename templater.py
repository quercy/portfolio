import jinja2

class Templater:
	def __init__(self):
		templateLoader = jinja2.FileSystemLoader( searchpath="./" )
		templateEnv = jinja2.Environment( loader=templateLoader )
		self.template = templateEnv.get_template( "_template.html" )

	def render(self, data):
		print self.template.render(data)


if __name__ == '__main__':
	Templater().render({'title' : 'bio'})
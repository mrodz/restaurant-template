/**
 * Quick Utility Program to generate the media querries
 * used in {@link ./designs.scss}.
 * 
 * Allows the usage of:
 * <div data-hide-on="1100">
 *     This element will dissapear when the viewport shrinks
 *     to less than 1100 pixels!
 * </div>
 * 
 * @author @mrodz
 * @deprecated, replaced with SCSS inspired by this code.
 */
@Deprecated
public class GenerateMediaQuerries {
	public static void main(String[] args) {
		for (int i = 40; i >= 0; i--) {
			System.out.printf("@media only screen and (max-width: %dpx) {\n\t[data-hide-on=\"%d\"] {\n\t\tdisplay: none;\n\t}\n}\n\n", i * 100, i * 100);
		}		
	}
}
